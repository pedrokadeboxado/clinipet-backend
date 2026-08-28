import { Inject, NotFoundException } from '@nestjs/common';
import type { AdminRepositoryInterface } from '../../models/interface/adminRepositoryInterface';
export class FindOneAdminByIdUseCase {
  constructor(
    @Inject('AdminRepositoryInterface')
    private readonly repository: AdminRepositoryInterface,
  ) {}
  async execute(id: number) {
    const entity = await this.repository.findOneBy(id);
    if (!entity) throw new NotFoundException('Admin não encontrado');
    return entity;
  }
}
