import { UsuarioEntity } from '../../infra/entities/usuario.entity';

export interface UsuarioRepositoryInterface {
  create(data: Partial<UsuarioEntity>): Promise<UsuarioEntity>;
  listAll(): Promise<UsuarioEntity[]>;
  findOneBy(id: number): Promise<UsuarioEntity | null>;
  update(
    id: number,
    data: Partial<UsuarioEntity>,
  ): Promise<UsuarioEntity | null>;
  delete(id: number): Promise<UsuarioEntity | null>;
}
