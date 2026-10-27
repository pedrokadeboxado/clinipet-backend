import { Inject, NotFoundException } from '@nestjs/common';
import { UpdatePetDto } from '../../models/dto/updatePet.dto';
import { FindOnePetByIdUseCase } from '../findOnePetById/findOnePetById.usecase';
import type { PetRepositoryInterface } from '../../models/interface/petRepositoryInterface';
export class UpdatePetUseCase {
  constructor(
    @Inject('PetRepositoryInterface')
    private readonly repository: PetRepositoryInterface,
    private readonly findOne: FindOnePetByIdUseCase,
  ) {}
  async execute(id: number, data: UpdatePetDto) {
    await this.findOne.execute(id);
    const updatedPet = await this.repository.update(id, data);
    if (!updatedPet) throw new NotFoundException('Pet não encontrado');
    return updatedPet;
  }
}
