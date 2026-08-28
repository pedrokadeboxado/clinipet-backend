import { Inject, NotFoundException } from '@nestjs/common';
import type { PetRepositoryInterface } from '../../models/interface/petRepositoryInterface';
export class FindOnePetByIdUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly repository: PetRepositoryInterface,
  ) {}
  async execute(id: number) {
    const entity = await this.repository.findOneBy(id);
    if (!entity) throw new NotFoundException('Pet não encontrado');
    return entity;
  }
}
