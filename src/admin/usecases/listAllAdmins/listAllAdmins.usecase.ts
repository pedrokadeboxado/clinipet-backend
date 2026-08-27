import { Inject } from '@nestjs/common';
import type { AdminRepositoryInterface } from '../../models/interface/adminRepositoryInterface';
export class ListAllAdminsUseCase {
  constructor(
    @Inject('AdminRepositoryInterface')
    private readonly repository: AdminRepositoryInterface,
  ) {}
  execute() {
    return this.repository.listAll();
  }
}
