import { Inject, NotFoundException } from '@nestjs/common';
import type { TutorRepositoryInterface } from '../../models/interface/tutorRepositoryInterface';
export class FindOneTutorByIdUseCase {
  constructor(
    @Inject('TutorRepositoryInterface')
    private readonly repository: TutorRepositoryInterface,
  ) {}
  async execute(id: number) {
    const entity = await this.repository.findOneBy(id);
    if (!entity) throw new NotFoundException('Tutor não encontrado');
    return entity;
  }
}
