import { Inject } from '@nestjs/common';
import { UsuarioEntity } from '../../infra/entities/usuario.entity';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';

export class CreateUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepositoryInterface')
    private readonly repository: UsuarioRepositoryInterface,
  ) {}

  execute(data: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    return this.repository.create(data);
  }
}
