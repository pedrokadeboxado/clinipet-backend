import { PetEntity } from '../../infra/entities/pet.entity';
export interface PetRepositoryInterface {
  create(data: Partial<PetEntity>): Promise<PetEntity>;
  listAll(): Promise<PetEntity[]>;
  findOneBy(id: number): Promise<PetEntity | null>;
  update(id: number, data: Partial<PetEntity>): Promise<PetEntity | null>;
  delete(id: number): Promise<PetEntity | null>;
}
