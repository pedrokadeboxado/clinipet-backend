import { Inject } from '@nestjs/common';
import { ServiceEntity } from '../../infra/entities/service.entity';
import type { ServiceRepositoryInterface } from '../../models/interface/serviceRepositoryInterface';
export class CreateServiceUseCase {
  constructor(
    @Inject('ServiceRepositoryInterface')
    private readonly repository: ServiceRepositoryInterface,
  ) {}
  execute(data: Partial<ServiceEntity>) {
    return this.repository.create(data);
  }
}
