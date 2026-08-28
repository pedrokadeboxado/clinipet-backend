import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetEntity } from '../../../pets/infra/entities/pet.entity';
import { VacinaEntity } from '../../../vacinas/infra/entities/vacina.entity';
import { MessageEntity } from '../../../messages/infra/entities/message.entity';

@Entity({ name: 'pet_vacina' })
export class PetVacinaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data_aplicacao', type: 'date' })
  data_aplicacao: string;

  @Column({ name: 'data_proxima_dose', type: 'date' })
  data_proxima_dose: string;

  @ManyToOne(() => PetEntity, (pet) => pet.petVacinas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_pet' })
  pet: PetEntity;

  @Column({ name: 'id_pet', type: 'integer' })
  id_pet: number;

  @ManyToOne(() => VacinaEntity, (vacina) => vacina.petVacinas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_vacina' })
  vacina: VacinaEntity;

  @Column({ name: 'id_vacina', type: 'integer' })
  id_vacina: number;

  // @OneToMany(() => MessageEntity, (message) => message.petVacina)
  // messages: MessageEntity[];
}
