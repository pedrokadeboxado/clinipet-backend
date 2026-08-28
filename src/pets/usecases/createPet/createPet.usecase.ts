import { Inject } from '@nestjs/common';
import { PetEntity } from '../../infra/entities/pet.entity';
import type { PetRepositoryInterface } from '../../models/interface/petRepositoryInterface';
export class CreatePetUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly repository: PetRepositoryInterface,
  ) {}
  execute(data: Partial<PetEntity>) {
    return this.repository.create(data);
  }
}
