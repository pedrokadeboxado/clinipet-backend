import { Inject } from '@nestjs/common';
import { FindOneAgendamentoByIdUseCase } from '../findOneAgendamentoById/findOneAgendamentoById.usecase';
import type { AgendamentoRepositoryInterface } from '../../models/interface/agendamentoRepositoryInterface';
export class DeleteAgendamentoUseCase {
  constructor(
    @Inject('AgendamentoRepositoryInterface')
    private readonly repository: AgendamentoRepositoryInterface,
    private readonly findOne: FindOneAgendamentoByIdUseCase,
  ) {}
  async execute(id: number) {
    await this.findOne.execute(id);
    return this.repository.delete(id);
  }
}
