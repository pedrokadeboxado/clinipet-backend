import { Inject } from '@nestjs/common';
import { FindOneAdminByIdUseCase } from '../findOneAdminById/findOneAdminById.usecase';
import type { AdminRepositoryInterface } from '../../models/interface/adminRepositoryInterface';
export class DeleteAdminUseCase {
  constructor(
    @Inject('AdminRepositoryInterface')
    private readonly repository: AdminRepositoryInterface,
    private readonly findOne: FindOneAdminByIdUseCase,
  ) {}
  async execute(id: number) {
    await this.findOne.execute(id);
    return this.repository.delete(id);
  }
}
