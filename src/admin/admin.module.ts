import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './infra/entities/admin.entity';
import { AdminTypeOrmRepository } from './infra/repositories/adminTypeOrm.repository';
import { CreateAdminController } from './usecases/createAdmin/createAdmin.controller';
import { ListAllAdminsController } from './usecases/listAllAdmins/listAllAdmins.controller';
import { FindOneAdminByIdController } from './usecases/findOneAdminById/findOneAdminById.controller';
import { UpdateAdminController } from './usecases/updateAdmin/updateAdmin.controller';
import { DeleteAdminController } from './usecases/deleteAdmin/deleteAdmin.controller';
import { CreateAdminUseCase } from './usecases/createAdmin/createAdmin.usecase';
import { ListAllAdminsUseCase } from './usecases/listAllAdmins/listAllAdmins.usecase';
import { FindOneAdminByIdUseCase } from './usecases/findOneAdminById/findOneAdminById.usecase';
import { UpdateAdminUseCase } from './usecases/updateAdmin/updateAdmin.usecase';
import { DeleteAdminUseCase } from './usecases/deleteAdmin/deleteAdmin.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  controllers: [
    CreateAdminController,
    ListAllAdminsController,
    FindOneAdminByIdController,
    UpdateAdminController,
    DeleteAdminController,
  ],
  providers: [
    AdminTypeOrmRepository,
    CreateAdminUseCase,
    ListAllAdminsUseCase,
    FindOneAdminByIdUseCase,
    UpdateAdminUseCase,
    DeleteAdminUseCase,
    {
      provide: 'AdminRepositoryInterface',
      useExisting: AdminTypeOrmRepository,
    },
  ],
  exports: [
    CreateAdminUseCase,
    ListAllAdminsUseCase,
    FindOneAdminByIdUseCase,
    UpdateAdminUseCase,
    DeleteAdminUseCase,
  ],
})
export class AdminModule {}
