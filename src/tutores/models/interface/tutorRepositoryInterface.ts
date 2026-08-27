import { TutorEntity } from '../../infra/entities/tutor.entity';
export interface TutorRepositoryInterface {
  create(data: Partial<TutorEntity>): Promise<TutorEntity>;
  listAll(): Promise<TutorEntity[]>;
  findOneBy(id: number): Promise<TutorEntity | null>;
  update(id: number, data: Partial<TutorEntity>): Promise<TutorEntity | null>;
  delete(id: number): Promise<TutorEntity | null>;
}
