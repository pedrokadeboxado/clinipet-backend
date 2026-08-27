import { Inject, NotFoundException } from '@nestjs/common';
import type { ServiceRepositoryInterface } from '../../models/interface/serviceRepositoryInterface';
export class FindOneServiceByIdUseCase {
  constructor(
    @Inject('ServiceRepositoryInterface')
    private readonly repository: ServiceRepositoryInterface,
  ) {}
  async execute(id: number) {
    const entity = await this.repository.findOneBy(id);
    if (!entity) throw new NotFoundException('Serviço não encontrado');
    return entity;
  }
}
