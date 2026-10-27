import { Inject, NotFoundException } from '@nestjs/common';
import { UpdatePetVacinaDto } from '../../models/dto/updatePetVacina.dto';
import { FindOnePetVacinaByIdUseCase } from '../findOnePetVacinaById/findOnePetVacinaById.usecase';
import type { PetVacinaRepositoryInterface } from '../../models/interface/petVacinaRepositoryInterface';
export class UpdatePetVacinaUseCase {
  constructor(
    @Inject('PetVacinaRepositoryInterface')
    private readonly repository: PetVacinaRepositoryInterface,
    private readonly findOne: FindOnePetVacinaByIdUseCase,
  ) {}
  async execute(id: number, data: UpdatePetVacinaDto) {
    await this.findOne.execute(id);
    const updatedPetVacina = await this.repository.update(id, data);
    if (!updatedPetVacina) {
      throw new NotFoundException('Registro de vacina não encontrado');
    }
    return updatedPetVacina;
  }
}
