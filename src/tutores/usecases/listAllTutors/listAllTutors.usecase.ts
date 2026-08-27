import { Inject } from '@nestjs/common';
import type { TutorRepositoryInterface } from '../../models/interface/tutorRepositoryInterface';
export class ListAllTutorsUseCase {
  constructor(
    @Inject('TutorRepositoryInterface')
    private readonly repository: TutorRepositoryInterface,
  ) {}
  execute() {
    return this.repository.listAll();
  }
}
