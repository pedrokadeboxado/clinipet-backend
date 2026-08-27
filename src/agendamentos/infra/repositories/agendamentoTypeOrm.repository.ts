import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AgendamentoEntity } from '../entities/agendamento.entity';
import { AgendamentoRepositoryInterface } from '../../models/interface/agendamentoRepositoryInterface';
export class AgendamentoTypeOrmRepository implements AgendamentoRepositoryInterface {
  constructor(
    @InjectRepository(AgendamentoEntity)
    private readonly repository: Repository<AgendamentoEntity>,
  ) {}
  listAll() {
    return this.repository.find({ relations: ['pet', 'service'] });
  }
  create(data: Partial<AgendamentoEntity>) {
    return this.repository.save(this.repository.create(data));
  }
  findOneBy(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['pet', 'service'],
    });
  }
  async update(id: number, data: Partial<AgendamentoEntity>) {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }
  async delete(id: number) {
    const entity = await this.findOneBy(id);
    if (!entity) throw new NotFoundException('Agendamento não encontrado');
    return this.repository.remove(entity);
  }
}
