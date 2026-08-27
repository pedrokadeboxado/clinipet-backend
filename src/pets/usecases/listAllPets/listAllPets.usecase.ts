import { Inject } from '@nestjs/common';
import type { PetRepositoryInterface } from '../../models/interface/petRepositoryInterface';
export class ListAllPetsUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly repository: PetRepositoryInterface,
  ) {}
  execute() {
    return this.repository.listAll();
  }
}
