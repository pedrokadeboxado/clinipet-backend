import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { VacinaEntity } from '../entities/vacina.entity';
import { VacinaRepositoryInterface } from '../../models/interface/vacinaRepositoryInterface';
export class VacinaTypeOrmRepository implements VacinaRepositoryInterface {
  constructor(
    @InjectRepository(VacinaEntity)
    private readonly repository: Repository<VacinaEntity>,
  ) {}
  listAll() {
    return this.repository.find();
  }
  create(data: Partial<VacinaEntity>) {
    return this.repository.save(this.repository.create(data));
  }
  findOneBy(id: number) {
    return this.repository.findOneBy({ id });
  }
  async update(id: number, data: Partial<VacinaEntity>) {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }
  async delete(id: number) {
    const entity = await this.findOneBy(id);
    if (!entity) throw new NotFoundException('Vacina não encontrada');
    return this.repository.remove(entity);
  }
}
