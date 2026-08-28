import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorEntity } from './infra/entities/tutor.entity';
import { TutorTypeOrmRepository } from './infra/repositories/tutorTypeOrm.repository';
import { CreateTutorUseCase } from './usecases/createTutor/createTutor.usecase';
import { ListAllTutorsUseCase } from './usecases/listAllTutors/listAllTutors.usecase';
import { FindOneTutorByIdUseCase } from './usecases/findOneTutorById/findOneTutorById.usecase';
import { UpdateTutorUseCase } from './usecases/updateTutor/updateTutor.usecase';
import { DeleteTutorUseCase } from './usecases/deleteTutor/deleteTutor.usecase';
import { CreateTutorController } from './usecases/createTutor/createTutor.controller';
import { ListAllTutorsController } from './usecases/listAllTutors/listAllTutors.controller';
import { FindOneTutorByIdController } from './usecases/findOneTutorById/findOneTutorById.controller';
import { UpdateTutorController } from './usecases/updateTutor/updateTutor.controller';
import { DeleteTutorController } from './usecases/deleteTutor/deleteTutor.controller';
@Module({
  imports: [TypeOrmModule.forFeature([TutorEntity])],
  controllers: [
    CreateTutorController,
    ListAllTutorsController,
    FindOneTutorByIdController,
    UpdateTutorController,
    DeleteTutorController,
  ],
  providers: [
    TutorTypeOrmRepository,
    CreateTutorUseCase,
    ListAllTutorsUseCase,
    FindOneTutorByIdUseCase,
    UpdateTutorUseCase,
    DeleteTutorUseCase,
    {
      provide: 'TutorRepositoryInterface',
      useExisting: TutorTypeOrmRepository,
    },
  ],
  exports: [
    CreateTutorUseCase,
    ListAllTutorsUseCase,
    FindOneTutorByIdUseCase,
    UpdateTutorUseCase,
    DeleteTutorUseCase,
  ],
})
export class TutoresModule {}
