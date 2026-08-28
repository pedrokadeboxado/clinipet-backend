import { Inject } from '@nestjs/common';
import { AdminEntity } from '../../infra/entities/admin.entity';
import type { AdminRepositoryInterface } from '../../models/interface/adminRepositoryInterface';
export class CreateAdminUseCase {
  constructor(
    @Inject('AdminRepositoryInterface')
    private readonly repository: AdminRepositoryInterface,
  ) {}
  execute(data: Partial<AdminEntity>) {
    return this.repository.create(data);
  }
}
