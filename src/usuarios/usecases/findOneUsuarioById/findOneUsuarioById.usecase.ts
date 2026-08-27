import { Inject, NotFoundException } from '@nestjs/common';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';

export class FindOneUsuarioByIdUseCase {
  constructor(
    @Inject('UsuarioRepositoryInterface')
    private readonly repository: UsuarioRepositoryInterface,
  ) {}

  async execute(id: number) {
    const usuario = await this.repository.findOneBy(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }
}
