import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetEntity } from '../../../pets/infra/entities/pet.entity';
import { ServiceEntity } from '../../../servicos/infra/entities/service.entity';

@Entity({ name: 'agendamentos' })
export class AgendamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  horario: string;

  @Column({ name: 'data_hora', type: 'date' })
  data_hora: string;

  @Column({ type: 'varchar' })
  status: string;

  @ManyToOne(() => PetEntity, (pet) => pet.agendamentos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_pet' })
  pet: PetEntity;

  @Column({ name: 'id_pet', type: 'integer' })
  id_pet: number;

  @ManyToOne(() => ServiceEntity, (service) => service.agendamentos, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_servico' })
  service: ServiceEntity;

  @Column({ name: 'id_servico', type: 'integer' })
  id_servico: number;
}
