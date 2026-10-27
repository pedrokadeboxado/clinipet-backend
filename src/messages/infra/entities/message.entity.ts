import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TutorEntity } from '../../../tutores/infra/entities/tutor.entity';

@Entity({ name: 'messages' })
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

  // Relação com TutorEntity temporariamente removida para evitar erro de metadata
  // enquanto o módulo de mensagens permanece desativado.
  @Column({ name: 'id_tutor', type: 'integer', nullable: true })
  id_tutor?: number;

  @Column({ name: 'id_servico', type: 'integer', nullable: true })
  id_servico?: number;

  @Column({ name: 'id_pet_vacina', type: 'integer', nullable: true })
  id_pet_vacina?: number;
}
