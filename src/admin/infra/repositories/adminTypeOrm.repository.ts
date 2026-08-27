import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AdminEntity } from '../entities/admin.entity';
import { AdminRepositoryInterface } from '../../models/interface/adminRepositoryInterface';

export class AdminTypeOrmRepository implements AdminRepositoryInterface {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly repository: Repository<AdminEntity>,
  ) {}

  listAll(): Promise<AdminEntity[]> {
    return this.repository.find();
  }
  async create(data: Partial<AdminEntity>): Promise<AdminEntity> {
    return this.repository.save(this.repository.create(data));
  }
  findOneBy(id: number): Promise<AdminEntity | null> {
    return this.repository.findOneBy({ id });
  }
  async update(
    id: number,
    data: Partial<AdminEntity>,
  ): Promise<AdminEntity | null> {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }
  async delete(id: number): Promise<AdminEntity | null> {
    const entity = await this.findOneBy(id);
    if (!entity) throw new NotFoundException('Admin não encontrado');
    return this.repository.remove(entity);
  }
}
