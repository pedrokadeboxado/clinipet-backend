import { Inject } from '@nestjs/common';
import { FindOnePetByIdUseCase } from '../findOnePetById/findOnePetById.usecase';
import type { PetRepositoryInterface } from '../../models/interface/petRepositoryInterface';
export class DeletePetUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly repository: PetRepositoryInterface,
    private readonly findOne: FindOnePetByIdUseCase,
  ) {}
  async execute(id: number) {
    await this.findOne.execute(id);
    return this.repository.delete(id);
  }
}
