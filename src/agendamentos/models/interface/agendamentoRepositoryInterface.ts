import { AgendamentoEntity } from '../../infra/entities/agendamento.entity';
export interface AgendamentoRepositoryInterface {
  create(data: Partial<AgendamentoEntity>): Promise<AgendamentoEntity>;
  listAll(): Promise<AgendamentoEntity[]>;
  findOneBy(id: number): Promise<AgendamentoEntity | null>;
  update(
    id: number,
    data: Partial<AgendamentoEntity>,
  ): Promise<AgendamentoEntity | null>;
  delete(id: number): Promise<AgendamentoEntity | null>;
}
