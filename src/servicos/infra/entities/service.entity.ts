import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AgendamentoEntity } from '../../../agendamentos/infra/entities/agendamento.entity';

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  servico: string;

  @Column({ name: 'duracao_min', type: 'varchar' })
  duracao_min: string;

  @Column({ type: 'varchar' })
  valor: string;

  @OneToMany(() => AgendamentoEntity, (agendamento) => agendamento.service)
  agendamentos: AgendamentoEntity[];
}
