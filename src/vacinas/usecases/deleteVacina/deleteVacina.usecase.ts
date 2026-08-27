import { Inject } from '@nestjs/common';
import { FindOneVacinaByIdUseCase } from '../findOneVacinaById/findOneVacinaById.usecase';
import type { VacinaRepositoryInterface } from '../../models/interface/vacinaRepositoryInterface';
export class DeleteVacinaUseCase {
  constructor(
    @Inject('VacinaRepositoryInterface')
    private readonly repository: VacinaRepositoryInterface,
    private readonly findOne: FindOneVacinaByIdUseCase,
  ) {}
  async execute(id: number) {
    await this.findOne.execute(id);
    return this.repository.delete(id);
  }
}
