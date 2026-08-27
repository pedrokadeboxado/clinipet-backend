import { Inject } from '@nestjs/common';
import { VacinaEntity } from '../../infra/entities/vacina.entity';
import type { VacinaRepositoryInterface } from '../../models/interface/vacinaRepositoryInterface';
export class CreateVacinaUseCase {
  constructor(
    @Inject('VacinaRepositoryInterface')
    private readonly repository: VacinaRepositoryInterface,
  ) {}
  execute(data: Partial<VacinaEntity>) {
    return this.repository.create(data);
  }
}
