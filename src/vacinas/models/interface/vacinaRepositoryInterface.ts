import { VacinaEntity } from '../../infra/entities/vacina.entity';
export interface VacinaRepositoryInterface {
  create(data: Partial<VacinaEntity>): Promise<VacinaEntity>;
  listAll(): Promise<VacinaEntity[]>;
  findOneBy(id: number): Promise<VacinaEntity | null>;
  update(id: number, data: Partial<VacinaEntity>): Promise<VacinaEntity | null>;
  delete(id: number): Promise<VacinaEntity | null>;
}
