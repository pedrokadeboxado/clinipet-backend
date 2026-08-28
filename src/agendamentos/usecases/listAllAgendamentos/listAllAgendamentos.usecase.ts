import { Inject } from '@nestjs/common';
import type { AgendamentoRepositoryInterface } from '../../models/interface/agendamentoRepositoryInterface';
export class ListAllAgendamentosUseCase {
  constructor(
    @Inject('AgendamentoRepositoryInterface')
    private readonly repository: AgendamentoRepositoryInterface,
  ) {}
  execute() {
    return this.repository.listAll();
  }
}
