import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ServiceEntity } from '../entities/service.entity';
import { ServiceRepositoryInterface } from '../../models/interface/serviceRepositoryInterface';
export class ServiceTypeOrmRepository implements ServiceRepositoryInterface {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly repository: Repository<ServiceEntity>,
  ) {}
  listAll() {
    return this.repository.find({ relations: ['agendamentos', 'messages'] });
  }
  create(data: Partial<ServiceEntity>) {
    return this.repository.save(this.repository.create(data));
  }
  findOneBy(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['agendamentos', 'messages'],
    });
  }
  async update(id: number, data: Partial<ServiceEntity>) {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }
  async delete(id: number) {
    const entity = await this.findOneBy(id);
    if (!entity) throw new NotFoundException('Serviço não encontrado');
    return this.repository.remove(entity);
  }
}
