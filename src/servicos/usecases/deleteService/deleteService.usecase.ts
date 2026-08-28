import { Inject } from '@nestjs/common';
import { FindOneServiceByIdUseCase } from '../findOneServiceById/findOneServiceById.usecase';
import type { ServiceRepositoryInterface } from '../../models/interface/serviceRepositoryInterface';
export class DeleteServiceUseCase {
  constructor(
    @Inject('ServiceRepositoryInterface')
    private readonly repository: ServiceRepositoryInterface,
    private readonly findOne: FindOneServiceByIdUseCase,
  ) {}
  async execute(id: number) {
    await this.findOne.execute(id);
    return this.repository.delete(id);
  }
}
