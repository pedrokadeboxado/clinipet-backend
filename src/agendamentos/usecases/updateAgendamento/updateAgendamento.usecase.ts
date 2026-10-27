import { Inject, NotFoundException } from '@nestjs/common';
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
    const updatedAgendamento = await this.repository.update(id, data);
    if (!updatedAgendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }
    return updatedAgendamento;
  }
}
