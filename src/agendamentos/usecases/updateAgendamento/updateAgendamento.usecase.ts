import { Inject } from '@nestjs/common';
import { UpdateAgendamentoDto } from '../../models/dto/updateAgendamento.dto';
import { FindOneAgendamentoByIdUseCase } from '../findOneAgendamentoById/findOneAgendamentoById.usecase';
import type { AgendamentoRepositoryInterface } from '../../models/interface/agendamentoRepositoryInterface';
export class UpdateAgendamentoUseCase {
  constructor(
    @Inject('AgendamentoRepositoryInterface')
    private readonly repository: AgendamentoRepositoryInterface,
    private readonly findOne: FindOneAgendamentoByIdUseCase,
  ) {}
  async execute(id: number, data: UpdateAgendamentoDto) {
    await this.findOne.execute(id);
    return this.repository.update(id, data);
  }
}
