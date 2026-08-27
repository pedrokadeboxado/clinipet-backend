import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetVacinaEntity } from './infra/entities/petVacina.entity';
import { PetVacinaTypeOrmRepository } from './infra/repositories/petVacinaTypeOrm.repository';
import { CreatePetVacinaUseCase } from './usecases/createPetVacina/createPetVacina.usecase';
import { ListAllPetVacinasUseCase } from './usecases/listAllPetVacinas/listAllPetVacinas.usecase';
import { FindOnePetVacinaByIdUseCase } from './usecases/findOnePetVacinaById/findOnePetVacinaById.usecase';
import { UpdatePetVacinaUseCase } from './usecases/updatePetVacina/updatePetVacina.usecase';
import { DeletePetVacinaUseCase } from './usecases/deletePetVacina/deletePetVacina.usecase';
import { CreatePetVacinaController } from './usecases/createPetVacina/createPetVacina.controller';
import { ListAllPetVacinasController } from './usecases/listAllPetVacinas/listAllPetVacinas.controller';
import { FindOnePetVacinaByIdController } from './usecases/findOnePetVacinaById/findOnePetVacinaById.controller';
import { UpdatePetVacinaController } from './usecases/updatePetVacina/updatePetVacina.controller';
import { DeletePetVacinaController } from './usecases/deletePetVacina/deletePetVacina.controller';
@Module({
  imports: [TypeOrmModule.forFeature([PetVacinaEntity])],
  controllers: [
    CreatePetVacinaController,
    ListAllPetVacinasController,
    FindOnePetVacinaByIdController,
    UpdatePetVacinaController,
    DeletePetVacinaController,
  ],
  providers: [
    PetVacinaTypeOrmRepository,
    CreatePetVacinaUseCase,
    ListAllPetVacinasUseCase,
    FindOnePetVacinaByIdUseCase,
    UpdatePetVacinaUseCase,
    DeletePetVacinaUseCase,
    {
      provide: 'PetVacinaRepositoryInterface',
      useExisting: PetVacinaTypeOrmRepository,
    },
  ],
  exports: [
    CreatePetVacinaUseCase,
    ListAllPetVacinasUseCase,
    FindOnePetVacinaByIdUseCase,
    UpdatePetVacinaUseCase,
    DeletePetVacinaUseCase,
  ],
})
export class PetVacinaModule {}
