import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import type { UsuarioRepositoryInterface } from '../../models/interface/usuarioRepositoryInterface';

export class UsuarioTypeOrmRepository implements UsuarioRepositoryInterface {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly repository: Repository<UsuarioEntity>,
  ) {}

  listAll(): Promise<UsuarioEntity[]> {
    return this.repository.find();
  }

  create(data: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    return this.repository.save(this.repository.create(data));
  }

  findOneBy(id: number): Promise<UsuarioEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    data: Partial<UsuarioEntity>,
  ): Promise<UsuarioEntity | null> {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }

  async delete(id: number): Promise<UsuarioEntity | null> {
    const usuario = await this.findOneBy(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.repository.remove(usuario);
  }
}
