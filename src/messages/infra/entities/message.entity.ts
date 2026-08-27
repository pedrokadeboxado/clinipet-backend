import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TutorEntity } from '../../../tutores/infra/entities/tutor.entity';
import { ServiceEntity } from '../../../servicos/infra/entities/service.entity';
import { PetVacinaEntity } from '../../../petVacina/infra/entities/petVacina.entity';

@Entity({ name: 'messages', schema: 'sci_schema' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'varchar' })
  tipo: string;

  @Column({ name: 'enviado_em', type: 'varchar' })
  enviado_em: string;

  @Column({ type: 'boolean', default: false })
  lida: boolean;

  @ManyToOne(() => TutorEntity, (tutor) => tutor.messages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_tutor' })
  tutor: TutorEntity;

  @Column({ name: 'id_tutor', type: 'integer' })
  id_tutor: number;

  @ManyToOne(() => ServiceEntity, (service) => service.messages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_servico' })
  service: ServiceEntity;

  @Column({ name: 'id_servico', type: 'integer' })
  id_servico: number;

  // @ManyToOne(() => PetVacinaEntity, (petVacina) => petVacina.message, {
  //   nullable: true,
  //   onDelete: 'SET NULL',
  // })
  // @JoinColumn({ name: 'id_pet_vacina' })
  // petVacina?: PetVacinaEntity;

  @Column({ name: 'id_pet_vacina', type: 'integer', nullable: true })
  id_pet_vacina?: number;
}
