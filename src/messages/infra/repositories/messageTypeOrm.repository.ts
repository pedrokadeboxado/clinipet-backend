import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { MessageEntity } from '../entities/message.entity';
import { MessageRepositoryInterface } from '../../models/interface/messageRepositoryInterface';
export class MessageTypeOrmRepository implements MessageRepositoryInterface {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
  ) {}
  listAll() {
    return this.repository.find({
      relations: ['tutor', 'service', 'petVacina'],
    });
  }
  create(data: Partial<MessageEntity>) {
    return this.repository.save(this.repository.create(data));
  }
  findOneBy(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['tutor', 'service', 'petVacina'],
    });
  }
  async update(id: number, data: Partial<MessageEntity>) {
    await this.repository.update({ id }, data);
    return this.findOneBy(id);
  }
  async delete(id: number) {
    const entity = await this.findOneBy(id);
    if (!entity) throw new NotFoundException('Mensagem não encontrada');
    return this.repository.remove(entity);
  }
}
