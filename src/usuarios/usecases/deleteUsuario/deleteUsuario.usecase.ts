import { Inject } from '@nestjs/common';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';
import { FindOneUsuarioByIdUseCase } from '../findOneUsuarioById/findOneUsuarioById.usecase';

export class DeleteUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepositoryInterface')
    private readonly repository: UsuarioRepositoryInterface,
    private readonly findOneUsuarioByIdUseCase: FindOneUsuarioByIdUseCase,
  ) {}

  async execute(id: number) {
    await this.findOneUsuarioByIdUseCase.execute(id);
    return this.repository.delete(id);
  }
}
