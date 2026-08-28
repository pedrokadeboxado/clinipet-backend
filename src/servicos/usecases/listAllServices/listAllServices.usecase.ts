import { Inject } from '@nestjs/common';
import type { ServiceRepositoryInterface } from '../../models/interface/serviceRepositoryInterface';
export class ListAllServicesUseCase {
  constructor(
    @Inject('ServiceRepositoryInterface')
    private readonly repository: ServiceRepositoryInterface,
  ) {}
  execute() {
    return this.repository.listAll();
  }
}
