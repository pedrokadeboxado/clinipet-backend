import { Inject } from '@nestjs/common';
import { PetVacinaEntity } from '../../infra/entities/petVacina.entity';
import type { PetVacinaRepositoryInterface } from '../../models/interface/petVacinaRepositoryInterface';
export class CreatePetVacinaUseCase {
  constructor(
    @Inject('PetVacinaRepositoryInterface')
    private readonly repository: PetVacinaRepositoryInterface,
  ) {}
  execute(data: Partial<PetVacinaEntity>) {
    return this.repository.create(data);
  }
}
