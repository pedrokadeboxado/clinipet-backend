import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TutorEntity } from '../../../tutores/infra/entities/tutor.entity';
import { AgendamentoEntity } from '../../../agendamentos/infra/entities/agendamento.entity';
import { PetVacinaEntity } from '../../../petVacina/infra/entities/petVacina.entity';
import { EspeciePet } from '../../models/enum/especiePet.enum';

@Entity({ name: 'pets' })
export class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  raca: string;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'enum', enum: EspeciePet, nullable: true })
  especie!: EspeciePet | null;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.pets, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_tutor' })
  tutor: TutorEntity;

  @Column({ name: 'id_tutor', type: 'integer' })
  id_tutor: number;

  @OneToMany(() => AgendamentoEntity, (agendamento) => agendamento.pet)
  agendamentos: AgendamentoEntity[];

  @OneToMany(() => PetVacinaEntity, (petVacina) => petVacina.pet)
  petVacinas: PetVacinaEntity[];
}
