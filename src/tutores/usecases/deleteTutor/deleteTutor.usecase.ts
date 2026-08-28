import { Inject } from '@nestjs/common';
import { FindOneTutorByIdUseCase } from '../findOneTutorById/findOneTutorById.usecase';
import type { TutorRepositoryInterface } from '../../models/interface/tutorRepositoryInterface';
export class DeleteTutorUseCase {
  constructor(
    @Inject('TutorRepositoryInterface')
    private readonly repository: TutorRepositoryInterface,
    private readonly findOne: FindOneTutorByIdUseCase,
  ) {}
  async execute(id: number) {
    await this.findOne.execute(id);
    return this.repository.delete(id);
  }
}
