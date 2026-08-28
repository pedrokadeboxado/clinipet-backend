import { Inject, NotFoundException } from '@nestjs/common';
import type { PetVacinaRepositoryInterface } from '../../models/interface/petVacinaRepositoryInterface';
export class FindOnePetVacinaByIdUseCase {
  constructor(
    @Inject('PetVacinaRepositoryInterface')
    private readonly repository: PetVacinaRepositoryInterface,
  ) {}
  async execute(id: number) {
    const entity = await this.repository.findOneBy(id);
    if (!entity)
      throw new NotFoundException('Registro de vacina não encontrado');
    return entity;
  }
}
