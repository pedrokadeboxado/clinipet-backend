import { MessageEntity } from '../../infra/entities/message.entity';
export interface MessageRepositoryInterface {
  create(data: Partial<MessageEntity>): Promise<MessageEntity>;
  listAll(): Promise<MessageEntity[]>;
  findOneBy(id: number): Promise<MessageEntity | null>;
  update(
    id: number,
    data: Partial<MessageEntity>,
  ): Promise<MessageEntity | null>;
  delete(id: number): Promise<MessageEntity | null>;
}
