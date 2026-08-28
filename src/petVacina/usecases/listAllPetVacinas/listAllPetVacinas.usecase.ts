import { Inject } from '@nestjs/common';
import type { PetVacinaRepositoryInterface } from '../../models/interface/petVacinaRepositoryInterface';
export class ListAllPetVacinasUseCase {
  constructor(
    @Inject('PetVacinaRepositoryInterface')
    private readonly repository: PetVacinaRepositoryInterface,
  ) {}
  execute() {
    return this.repository.listAll();
  }
}
