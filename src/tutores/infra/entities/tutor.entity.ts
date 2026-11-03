import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetEntity } from '../../../pets/infra/entities/pet.entity';

@Index('UQ_tutores_telegram_chat_id', ['telegramChatId'], {
  unique: true,
  where: '"telegram_chat_id" IS NOT NULL',
})
@Entity({ name: 'tutores' })
export class TutorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string | null;

  @OneToMany(() => PetEntity, (pet) => pet.tutor)
  pets: PetEntity[];

  @Column({
    name: 'telegram_chat_id',
    type: 'varchar',
    nullable: true,
    select: false,
  })
  telegramChatId: string | null;

  @Column({
    name: 'telegram_link_code_hash',
    type: 'varchar',
    nullable: true,
    select: false,
  })
  telegramLinkCodeHash: string | null;

  @Column({
    name: 'telegram_link_code_expires_at',
    type: 'timestamptz',
    nullable: true,
    select: false,
  })
  telegramLinkCodeExpiresAt: Date | null;

  // Relação de mensagens temporariamente removida porque o módulo MessagesModule
  // está comentado e a entidade MessageEntity não está sendo registrada no TypeORM.
}
