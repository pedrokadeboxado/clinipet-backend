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

  @Column({ name: 'data_hora', type: 'timestamptz' })
  data_hora: Date;

  @Column({ name: 'lembrete_enviado_em', type: 'timestamptz', nullable: true })
  lembrete_enviado_em: Date | null;

  @Column({ name: 'pronto_enviado_em', type: 'timestamptz', nullable: true })
  pronto_enviado_em: Date | null;

  @Column({ type: 'varchar', default: 'pendente', nullable: true })
  status?: string;

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
