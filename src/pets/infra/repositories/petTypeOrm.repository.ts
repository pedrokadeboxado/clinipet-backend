import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PetEntity } from '../entities/pet.entity';
import { PetRepositoryInterface } from '../../models/interface/petRepositoryInterface';
export class PetTypeOrmRepository implements PetRepositoryInterface {
  constructor(
    @InjectRepository(PetEntity)
    private readonly repository: Repository<PetEntity>,
  ) {}
  listAll() {
    return this.repository.find({
      relations: ['tutor', 'agendamentos', 'petVacinas'],
    });
  }
  create(data: Partial<PetEntity>) {
    return this.repository.save(this.repository.create(data));
  }
  findOneBy(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['tutor', 'agendamentos', 'petVacinas'],
    });
  }
  async update(id: number, data: Partial<PetEntity>) {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }
  async delete(id: number) {
    const entity = await this.findOneBy(id);
    if (!entity) throw new NotFoundException('Pet não encontrado');
    return this.repository.remove(entity);
  }
}
