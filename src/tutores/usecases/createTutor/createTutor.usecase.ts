import { Inject } from '@nestjs/common';
import { TutorEntity } from '../../infra/entities/tutor.entity';
import type { TutorRepositoryInterface } from '../../models/interface/tutorRepositoryInterface';
export class CreateTutorUseCase {
  constructor(
    @Inject('TutorRepositoryInterface')
    private readonly repository: TutorRepositoryInterface,
  ) {}
  execute(data: Partial<TutorEntity>) {
    return this.repository.create(data);
  }
}
