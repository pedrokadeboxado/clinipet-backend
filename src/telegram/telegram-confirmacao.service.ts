import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendamentoEntity } from '../agendamentos/infra/entities/agendamento.entity';
import { PetVacinaEntity } from '../petVacina/infra/entities/petVacina.entity';
import { TelegramService } from './telegram.service';

const TIMEZONE = 'America/Sao_Paulo';

@Injectable()
export class TelegramConfirmacaoService {
  private readonly logger = new Logger(TelegramConfirmacaoService.name);

  constructor(
    @InjectRepository(AgendamentoEntity)
    private readonly agendamentoRepository: Repository<AgendamentoEntity>,
    @InjectRepository(PetVacinaEntity)
    private readonly petVacinaRepository: Repository<PetVacinaEntity>,
    private readonly telegramService: TelegramService,
  ) {}

  // Nunca lança: a confirmação não pode derrubar o cadastro já realizado.
  async confirmarAgendamento(id: number): Promise<void> {
    try {
      const agendamento = await this.agendamentoRepository
        .createQueryBuilder('a')
        .innerJoinAndSelect('a.pet', 'pet')
        .innerJoinAndSelect('a.service', 'service')
        .innerJoinAndSelect('pet.tutor', 'tutor')
        .addSelect('tutor.telegramChatId')
        .where('a.id = :id', { id })
        .getOne();

      const chatId = agendamento?.pet.tutor.telegramChatId;
      if (!agendamento || !chatId) return;

      await this.telegramService.enviarMensagem(
        chatId,
        `Olá, ${agendamento.pet.tutor.nome}! Agendamento confirmado: ${agendamento.service.servico} para ${agendamento.pet.nome} em ${this.formatar(agendamento.data_hora)}.`,
        { agendamentoId: agendamento.id, tipo: 'confirmacao_agendamento' },
      );
    } catch (error) {
      this.logger.warn(
        `Não foi possível enviar a confirmação do agendamento ${id}.`,
      );
      this.logger.debug(error);
    }
  }

  async confirmarVacinacao(id: number): Promise<void> {
    try {
      const registro = await this.petVacinaRepository
        .createQueryBuilder('pv')
        .innerJoinAndSelect('pv.pet', 'pet')
        .innerJoinAndSelect('pv.vacina', 'vacina')
        .innerJoinAndSelect('pet.tutor', 'tutor')
        .addSelect('tutor.telegramChatId')
        .where('pv.id = :id', { id })
        .getOne();

      const chatId = registro?.pet.tutor.telegramChatId;
      if (!registro || !chatId) return;

      await this.telegramService.enviarMensagem(
        chatId,
        `Olá, ${registro.pet.tutor.nome}! Vacinação registrada: ${registro.vacina.vacina} aplicada em ${registro.pet.nome} em ${this.formatar(registro.data_aplicacao)}.${registro.data_proxima_dose ? ` Próxima dose: ${this.formatar(registro.data_proxima_dose)}.` : ''}`,
        { tipo: 'confirmacao_vacinacao' },
      );
    } catch (error) {
      this.logger.warn(
        `Não foi possível enviar a confirmação da vacinação ${id}.`,
      );
      this.logger.debug(error);
    }
  }

  private formatar(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: TIMEZONE,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(data));
  }
}
