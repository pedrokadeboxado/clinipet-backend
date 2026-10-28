import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateAdminDto } from '../../models/dto/updateAdmin.dto';
import { FindOneAdminByIdUseCase } from '../findOneAdminById/findOneAdminById.usecase';
import type { AdminRepositoryInterface } from '../../models/interface/adminRepositoryInterface';
export class UpdateAdminUseCase {
  constructor(
    @Inject('AdminRepositoryInterface')
    private readonly repository: AdminRepositoryInterface,
    private readonly findOne: FindOneAdminByIdUseCase,
  ) {}
  async execute(id: number, data: UpdateAdminDto) {
    await this.findOne.execute(id);
    const updatedAdmin = await this.repository.update(id, data);
    if (!updatedAdmin) throw new NotFoundException('Admin não encontrado');
    return updatedAdmin;
  }
}
