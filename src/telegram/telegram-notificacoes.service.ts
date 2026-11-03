import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { AgendamentoEntity } from '../agendamentos/infra/entities/agendamento.entity';
import { TelegramService } from './telegram.service';

const DEFAULT_LEMBRETE_ANTECEDENCIA_MIN = 60;
// Evita notificar agendamentos antigos (ex.: após o servidor ficar fora do ar).
const JANELA_MAXIMA_PRONTO_MS = 6 * 60 * 60 * 1000;
const STATUS_INATIVOS = ['cancelado', 'concluido', 'concluído'];
const TIMEZONE = 'America/Sao_Paulo';

type TipoAviso = 'lembrete_enviado_em' | 'pronto_enviado_em';

@Injectable()
export class TelegramNotificacoesService {
  private readonly logger = new Logger(TelegramNotificacoesService.name);
  private executando = false;

  constructor(
    @InjectRepository(AgendamentoEntity)
    private readonly agendamentoRepository: Repository<AgendamentoEntity>,
    private readonly telegramService: TelegramService,
    private readonly config: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async executar(): Promise<void> {
    if (this.executando) return;
    this.executando = true;
    try {
      await this.enviarLembretes();
      await this.enviarAvisosDeProntidao();
    } catch (error) {
      this.logger.error('Falha ao processar notificações do Telegram', error);
    } finally {
      this.executando = false;
    }
  }

  async enviarLembretes(now = new Date()): Promise<void> {
    const antecedenciaMin = this.antecedenciaMin();
    const limite = new Date(now.getTime() + antecedenciaMin * 60 * 1000);

    const agendamentos = await this.consultaBase('lembrete_enviado_em')
      .andWhere('a.data_hora > :now AND a.data_hora <= :limite', {
        now,
        limite,
      })
      .getMany();

    for (const agendamento of agendamentos) {
      const minutos = Math.max(
        1,
        Math.round((agendamento.data_hora.getTime() - now.getTime()) / 60_000),
      );
      await this.enviarAviso(
        agendamento,
        'lembrete_enviado_em',
        `Olá, ${agendamento.pet.tutor.nome}! Lembrete: ${agendamento.pet.nome} tem ${agendamento.service.servico} agendado para ${this.formatarHorario(agendamento.data_hora)} (em cerca de ${minutos} min). Até já!`,
      );
    }
  }

  async enviarAvisosDeProntidao(now = new Date()): Promise<void> {
    const agendamentos = await this.consultaBase('pronto_enviado_em')
      .andWhere('a.data_hora <= :now AND a.data_hora >= :inicio', {
        now,
        inicio: new Date(
          now.getTime() - JANELA_MAXIMA_PRONTO_MS - 24 * 60 * 60 * 1000,
        ),
      })
      .getMany();

    for (const agendamento of agendamentos) {
      const duracaoMin = Number.parseInt(agendamento.service.duracao_min, 10);
      if (!Number.isFinite(duracaoMin) || duracaoMin < 0) continue;

      const fim = agendamento.data_hora.getTime() + duracaoMin * 60_000;
      if (fim > now.getTime() || fim < now.getTime() - JANELA_MAXIMA_PRONTO_MS) {
        continue;
      }

      await this.enviarAviso(
        agendamento,
        'pronto_enviado_em',
        `Olá, ${agendamento.pet.tutor.nome}! ${agendamento.pet.nome} está pronto(a) para a retirada. ${agendamento.service.servico} finalizado às ${this.formatarHorario(new Date(fim))}.`,
      );
    }
  }

  private consultaBase(campo: TipoAviso) {
    return this.agendamentoRepository
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.pet', 'pet')
      .innerJoinAndSelect('a.service', 'service')
      .innerJoinAndSelect('pet.tutor', 'tutor')
      .addSelect('tutor.telegramChatId')
      .where(`a.${campo} IS NULL`)
      .andWhere('tutor.telegramChatId IS NOT NULL')
      .andWhere('(a.status IS NULL OR LOWER(a.status) NOT IN (:...inativos))', {
        inativos: STATUS_INATIVOS,
      });
  }

  private async enviarAviso(
    agendamento: AgendamentoEntity,
    campo: TipoAviso,
    texto: string,
  ): Promise<void> {
    const chatId = agendamento.pet.tutor.telegramChatId;
    if (!chatId) return;

    // Reserva o aviso de forma atômica para não enviar duplicado.
    const reserva = await this.agendamentoRepository.update(
      { id: agendamento.id, [campo]: IsNull() },
      { [campo]: new Date() },
    );
    if (!reserva.affected) return;

    try {
      await this.telegramService.enviarMensagem(chatId, texto);
    } catch (error) {
      await this.agendamentoRepository.update(agendamento.id, {
        [campo]: null,
      });
      this.logger.warn(
        `Não foi possível enviar ${campo} do agendamento ${agendamento.id}; nova tentativa no próximo ciclo.`,
      );
      this.logger.debug(error);
    }
  }

  private antecedenciaMin(): number {
    const valor = Number(
      this.config.get<string>('TELEGRAM_LEMBRETE_ANTECEDENCIA_MIN'),
    );
    return Number.isFinite(valor) && valor > 0
      ? valor
      : DEFAULT_LEMBRETE_ANTECEDENCIA_MIN;
  }

  private formatarHorario(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: TIMEZONE,
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(data);
  }
}
