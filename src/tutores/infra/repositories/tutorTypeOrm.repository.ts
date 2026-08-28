import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TutorEntity } from '../entities/tutor.entity';
import { TutorRepositoryInterface } from '../../models/interface/tutorRepositoryInterface';
export class TutorTypeOrmRepository implements TutorRepositoryInterface {
  constructor(
    @InjectRepository(TutorEntity)
    private readonly repository: Repository<TutorEntity>,
  ) {}
  listAll() {
    return this.repository.find({ relations: ['pets'] });
  }
  async create(data: Partial<TutorEntity>) {
    return this.repository.save(this.repository.create(data));
  }
  findOneBy(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['pets'] });
  }
  async update(id: number, data: Partial<TutorEntity>) {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }
  async delete(id: number) {
    const entity = await this.findOneBy(id);
    if (!entity) throw new NotFoundException('Tutor não encontrado');
    return this.repository.remove(entity);
  }
}
