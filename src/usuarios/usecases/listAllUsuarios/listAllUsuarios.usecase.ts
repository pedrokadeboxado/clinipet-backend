import { Inject } from '@nestjs/common';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';

export class ListAllUsuariosUseCase {
  constructor(
    @Inject('UsuarioRepositoryInterface')
    private readonly repository: UsuarioRepositoryInterface,
  ) {}

  execute() {
    return this.repository.listAll();
  }
}
