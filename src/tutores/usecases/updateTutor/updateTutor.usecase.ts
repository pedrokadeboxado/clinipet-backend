import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateTutorDto } from '../../models/dto/updateTutor.dto';
import { FindOneTutorByIdUseCase } from '../findOneTutorById/findOneTutorById.usecase';
import type { TutorRepositoryInterface } from '../../models/interface/tutorRepositoryInterface';
export class UpdateTutorUseCase {
  constructor(
    @Inject('TutorRepositoryInterface')
    private readonly repository: TutorRepositoryInterface,
    private readonly findOne: FindOneTutorByIdUseCase,
  ) {}
  async execute(id: number, data: UpdateTutorDto) {
    await this.findOne.execute(id);
    const updatedTutor = await this.repository.update(id, data);
    if (!updatedTutor) throw new NotFoundException('Tutor não encontrado');
    return updatedTutor;
  }
}
