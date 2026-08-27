import { Inject } from '@nestjs/common';
import { UpdateVacinaDto } from '../../models/dto/updateVacina.dto';
import { FindOneVacinaByIdUseCase } from '../findOneVacinaById/findOneVacinaById.usecase';
import type { VacinaRepositoryInterface } from '../../models/interface/vacinaRepositoryInterface';
export class UpdateVacinaUseCase {
  constructor(
    @Inject('VacinaRepositoryInterface')
    private readonly repository: VacinaRepositoryInterface,
    private readonly findOne: FindOneVacinaByIdUseCase,
  ) {}
  async execute(id: number, data: UpdateVacinaDto) {
    await this.findOne.execute(id);
    return this.repository.update(id, data);
  }
}
