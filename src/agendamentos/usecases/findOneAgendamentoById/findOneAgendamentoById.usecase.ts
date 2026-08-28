import { Inject, NotFoundException } from '@nestjs/common';
import type { AgendamentoRepositoryInterface } from '../../models/interface/agendamentoRepositoryInterface';
export class FindOneAgendamentoByIdUseCase {
  constructor(
    @Inject('AgendamentoRepositoryInterface')
    private readonly repository: AgendamentoRepositoryInterface,
  ) {}
  async execute(id: number) {
    const entity = await this.repository.findOneBy(id);
    if (!entity) throw new NotFoundException('Agendamento não encontrado');
    return entity;
  }
}
