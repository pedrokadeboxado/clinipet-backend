import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateUsuarioDto } from '../../models/dto/updateUsuario.dto';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';
import { FindOneUsuarioByIdUseCase } from '../findOneUsuarioById/findOneUsuarioById.usecase';

export class UpdateUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepositoryInterface')
    private readonly repository: UsuarioRepositoryInterface,
    private readonly findOneUsuarioByIdUseCase: FindOneUsuarioByIdUseCase,
  ) {}

  async execute(id: number, data: UpdateUsuarioDto) {
    await this.findOneUsuarioByIdUseCase.execute(id);
    const updatedUsuario = await this.repository.update(id, data);
    if (!updatedUsuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return updatedUsuario;
  }
}
