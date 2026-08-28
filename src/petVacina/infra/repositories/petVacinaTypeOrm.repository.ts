import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PetVacinaEntity } from '../entities/petVacina.entity';
import { PetVacinaRepositoryInterface } from '../../models/interface/petVacinaRepositoryInterface';
export class PetVacinaTypeOrmRepository implements PetVacinaRepositoryInterface {
  constructor(
    @InjectRepository(PetVacinaEntity)
    private readonly repository: Repository<PetVacinaEntity>,
  ) {}
  listAll() {
    return this.repository.find({ relations: ['pet', 'vacina'] });
  }
  create(data: Partial<PetVacinaEntity>) {
    return this.repository.save(this.repository.create(data));
  }
  findOneBy(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['pet', 'vacina'],
    });
  }
  async update(id: number, data: Partial<PetVacinaEntity>) {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }
  async delete(id: number) {
    const entity = await this.findOneBy(id);
    if (!entity)
      throw new NotFoundException('Registro de vacina não encontrado');
    return this.repository.remove(entity);
  }
}
