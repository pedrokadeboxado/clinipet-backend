import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PetEntity } from '../../../pets/infra/entities/pet.entity';
import { MessageEntity } from '../../../messages/infra/entities/message.entity';

@Entity({ name: 'tutores' })
export class TutorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @OneToMany(() => PetEntity, (pet) => pet.tutor)
  pets: PetEntity[];

  @OneToMany(() => MessageEntity, (message) => message.tutor)
  messages: MessageEntity[];
}
