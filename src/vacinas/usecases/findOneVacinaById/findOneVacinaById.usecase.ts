import { Inject, NotFoundException } from '@nestjs/common';
import type { VacinaRepositoryInterface } from '../../models/interface/vacinaRepositoryInterface';
export class FindOneVacinaByIdUseCase {
  constructor(
    @Inject('VacinaRepositoryInterface')
    private readonly repository: VacinaRepositoryInterface,
  ) {}
  async execute(id: number) {
    const entity = await this.repository.findOneBy(id);
    if (!entity) throw new NotFoundException('Vacina não encontrada');
    return entity;
  }
}
