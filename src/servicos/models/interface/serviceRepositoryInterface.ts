import { ServiceEntity } from '../../infra/entities/service.entity';
export interface ServiceRepositoryInterface {
  create(data: Partial<ServiceEntity>): Promise<ServiceEntity>;
  listAll(): Promise<ServiceEntity[]>;
  findOneBy(id: number): Promise<ServiceEntity | null>;
  update(
    id: number,
    data: Partial<ServiceEntity>,
  ): Promise<ServiceEntity | null>;
  delete(id: number): Promise<ServiceEntity | null>;
}
