import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PetEntity } from '../../../pets/infra/entities/pet.entity';

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

  // Relação de mensagens temporariamente removida porque o módulo MessagesModule
  // está comentado e a entidade MessageEntity não está sendo registrada no TypeORM.
}
