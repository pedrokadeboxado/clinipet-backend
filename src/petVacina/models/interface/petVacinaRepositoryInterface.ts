import { PetVacinaEntity } from '../../infra/entities/petVacina.entity';
export interface PetVacinaRepositoryInterface {
  create(data: Partial<PetVacinaEntity>): Promise<PetVacinaEntity>;
  listAll(): Promise<PetVacinaEntity[]>;
  findOneBy(id: number): Promise<PetVacinaEntity | null>;
  update(
    id: number,
    data: Partial<PetVacinaEntity>,
  ): Promise<PetVacinaEntity | null>;
  delete(id: number): Promise<PetVacinaEntity | null>;
}
