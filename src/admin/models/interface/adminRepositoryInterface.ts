import { AdminEntity } from '../../infra/entities/admin.entity';

export interface AdminRepositoryInterface {
  create(data: Partial<AdminEntity>): Promise<AdminEntity>;
  listAll(): Promise<AdminEntity[]>;
  findOneBy(id: number): Promise<AdminEntity | null>;
  update(id: number, data: Partial<AdminEntity>): Promise<AdminEntity | null>;
  delete(id: number): Promise<AdminEntity | null>;
}
