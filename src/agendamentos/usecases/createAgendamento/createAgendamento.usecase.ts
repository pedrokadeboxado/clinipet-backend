import { Inject } from '@nestjs/common';
import { TelegramConfirmacaoService } from '../../../telegram/telegram-confirmacao.service';
import { AgendamentoEntity } from '../../infra/entities/agendamento.entity';
import type { AgendamentoRepositoryInterface } from '../../models/interface/agendamentoRepositoryInterface';
export class CreateAgendamentoUseCase {
  constructor(
    @Inject('AgendamentoRepositoryInterface')
    private readonly repository: AgendamentoRepositoryInterface,
    private readonly confirmacao: TelegramConfirmacaoService,
  ) {}
  async execute(data: Partial<AgendamentoEntity>) {
    const agendamento = await this.repository.create(data);
    await this.confirmacao.confirmarAgendamento(agendamento.id);
    return agendamento;
  }
}
