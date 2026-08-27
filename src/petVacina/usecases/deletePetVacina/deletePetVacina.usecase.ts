import { Inject } from '@nestjs/common';
import { FindOnePetVacinaByIdUseCase } from '../findOnePetVacinaById/findOnePetVacinaById.usecase';
import type { PetVacinaRepositoryInterface } from '../../models/interface/petVacinaRepositoryInterface';
export class DeletePetVacinaUseCase {
  constructor(
    @Inject('PetVacinaRepositoryInterface')
    private readonly repository: PetVacinaRepositoryInterface,
    private readonly findOne: FindOnePetVacinaByIdUseCase,
  ) {}
  async execute(id: number) {
    await this.findOne.execute(id);
    return this.repository.delete(id);
  }
}
