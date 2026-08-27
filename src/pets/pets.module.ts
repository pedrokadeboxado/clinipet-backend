import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './infra/entities/pet.entity';
import { PetTypeOrmRepository } from './infra/repositories/petTypeOrm.repository';
import { CreatePetUseCase } from './usecases/createPet/createPet.usecase';
import { ListAllPetsUseCase } from './usecases/listAllPets/listAllPets.usecase';
import { FindOnePetByIdUseCase } from './usecases/findOnePetById/findOnePetById.usecase';
import { UpdatePetUseCase } from './usecases/updatePet/updatePet.usecase';
import { DeletePetUseCase } from './usecases/deletePet/deletePet.usecase';
import { CreatePetController } from './usecases/createPet/createPet.controller';
import { ListAllPetsController } from './usecases/listAllPets/listAllPets.controller';
import { FindOnePetByIdController } from './usecases/findOnePetById/findOnePetById.controller';
import { UpdatePetController } from './usecases/updatePet/updatePet.controller';
import { DeletePetController } from './usecases/deletePet/deletePet.controller';
@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  controllers: [
    CreatePetController,
    ListAllPetsController,
    FindOnePetByIdController,
    UpdatePetController,
    DeletePetController,
  ],
  providers: [
    PetTypeOrmRepository,
    CreatePetUseCase,
    ListAllPetsUseCase,
    FindOnePetByIdUseCase,
    UpdatePetUseCase,
    DeletePetUseCase,
    { provide: 'PetRepositoryInterface', useExisting: PetTypeOrmRepository },
  ],
  exports: [
    CreatePetUseCase,
    ListAllPetsUseCase,
    FindOnePetByIdUseCase,
    UpdatePetUseCase,
    DeletePetUseCase,
  ],
})
export class PetsModule {}
