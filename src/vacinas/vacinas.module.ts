import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacinaEntity } from './infra/entities/vacina.entity';
import { VacinaTypeOrmRepository } from './infra/repositories/vacinaTypeOrm.repository';
import { CreateVacinaUseCase } from './usecases/createVacina/createVacina.usecase';
import { ListAllVacinasUseCase } from './usecases/listAllVacinas/listAllVacinas.usecase';
import { FindOneVacinaByIdUseCase } from './usecases/findOneVacinaById/findOneVacinaById.usecase';
import { UpdateVacinaUseCase } from './usecases/updateVacina/updateVacina.usecase';
import { DeleteVacinaUseCase } from './usecases/deleteVacina/deleteVacina.usecase';
import { CreateVacinaController } from './usecases/createVacina/createVacina.controller';
import { ListAllVacinasController } from './usecases/listAllVacinas/listAllVacinas.controller';
import { FindOneVacinaByIdController } from './usecases/findOneVacinaById/findOneVacinaById.controller';
import { UpdateVacinaController } from './usecases/updateVacina/updateVacina.controller';
import { DeleteVacinaController } from './usecases/deleteVacina/deleteVacina.controller';
@Module({
  imports: [TypeOrmModule.forFeature([VacinaEntity])],
  controllers: [
    CreateVacinaController,
    ListAllVacinasController,
    FindOneVacinaByIdController,
    UpdateVacinaController,
    DeleteVacinaController,
  ],
  providers: [
    VacinaTypeOrmRepository,
    CreateVacinaUseCase,
    ListAllVacinasUseCase,
    FindOneVacinaByIdUseCase,
    UpdateVacinaUseCase,
    DeleteVacinaUseCase,
    {
      provide: 'VacinaRepositoryInterface',
      useExisting: VacinaTypeOrmRepository,
    },
  ],
  exports: [
    CreateVacinaUseCase,
    ListAllVacinasUseCase,
    FindOneVacinaByIdUseCase,
    UpdateVacinaUseCase,
    DeleteVacinaUseCase,
  ],
})
export class VacinasModule {}
