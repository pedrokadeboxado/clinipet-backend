import { Inject } from '@nestjs/common';
import type { VacinaRepositoryInterface } from '../../models/interface/vacinaRepositoryInterface';
export class ListAllVacinasUseCase {
  constructor(
    @Inject('VacinaRepositoryInterface')
    private readonly repository: VacinaRepositoryInterface,
  ) {}
  execute() {
    return this.repository.listAll();
  }
}
