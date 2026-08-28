import { Inject } from '@nestjs/common';
import { AgendamentoEntity } from '../../infra/entities/agendamento.entity';
import type { AgendamentoRepositoryInterface } from '../../models/interface/agendamentoRepositoryInterface';
export class CreateAgendamentoUseCase {
  constructor(
    @Inject('AgendamentoRepositoryInterface')
    private readonly repository: AgendamentoRepositoryInterface,
  ) {}
  execute(data: Partial<AgendamentoEntity>) {
    return this.repository.create(data);
  }
}
