import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamentoEntity } from './infra/entities/agendamento.entity';
import { AgendamentoTypeOrmRepository } from './infra/repositories/agendamentoTypeOrm.repository';
import { CreateAgendamentoUseCase } from './usecases/createAgendamento/createAgendamento.usecase';
import { ListAllAgendamentosUseCase } from './usecases/listAllAgendamentos/listAllAgendamentos.usecase';
import { FindOneAgendamentoByIdUseCase } from './usecases/findOneAgendamentoById/findOneAgendamentoById.usecase';
import { UpdateAgendamentoUseCase } from './usecases/updateAgendamento/updateAgendamento.usecase';
import { DeleteAgendamentoUseCase } from './usecases/deleteAgendamento/deleteAgendamento.usecase';
import { CreateAgendamentoController } from './usecases/createAgendamento/createAgendamento.controller';
import { ListAllAgendamentosController } from './usecases/listAllAgendamentos/listAllAgendamentos.controller';
import { FindOneAgendamentoByIdController } from './usecases/findOneAgendamentoById/findOneAgendamentoById.controller';
import { UpdateAgendamentoController } from './usecases/updateAgendamento/updateAgendamento.controller';
import { DeleteAgendamentoController } from './usecases/deleteAgendamento/deleteAgendamento.controller';
@Module({
  imports: [TypeOrmModule.forFeature([AgendamentoEntity])],
  controllers: [
    CreateAgendamentoController,
    ListAllAgendamentosController,
    FindOneAgendamentoByIdController,
    UpdateAgendamentoController,
    DeleteAgendamentoController,
  ],
  providers: [
    AgendamentoTypeOrmRepository,
    CreateAgendamentoUseCase,
    ListAllAgendamentosUseCase,
    FindOneAgendamentoByIdUseCase,
    UpdateAgendamentoUseCase,
    DeleteAgendamentoUseCase,
    {
      provide: 'AgendamentoRepositoryInterface',
      useExisting: AgendamentoTypeOrmRepository,
    },
  ],
  exports: [
    CreateAgendamentoUseCase,
    ListAllAgendamentosUseCase,
    FindOneAgendamentoByIdUseCase,
    UpdateAgendamentoUseCase,
    DeleteAgendamentoUseCase,
  ],
})
export class AgendamentosModule {}
