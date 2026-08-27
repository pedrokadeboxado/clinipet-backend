import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './infra/entities/service.entity';
import { ServiceTypeOrmRepository } from './infra/repositories/serviceTypeOrm.repository';
import { CreateServiceUseCase } from './usecases/createService/createService.usecase';
import { ListAllServicesUseCase } from './usecases/listAllServices/listAllServices.usecase';
import { FindOneServiceByIdUseCase } from './usecases/findOneServiceById/findOneServiceById.usecase';
import { UpdateServiceUseCase } from './usecases/updateService/updateService.usecase';
import { DeleteServiceUseCase } from './usecases/deleteService/deleteService.usecase';
import { CreateServiceController } from './usecases/createService/createService.controller';
import { ListAllServicesController } from './usecases/listAllServices/listAllServices.controller';
import { FindOneServiceByIdController } from './usecases/findOneServiceById/findOneServiceById.controller';
import { UpdateServiceController } from './usecases/updateService/updateService.controller';
import { DeleteServiceController } from './usecases/deleteService/deleteService.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  controllers: [
    CreateServiceController,
    ListAllServicesController,
    FindOneServiceByIdController,
    UpdateServiceController,
    DeleteServiceController,
  ],
  providers: [
    ServiceTypeOrmRepository,
    CreateServiceUseCase,
    ListAllServicesUseCase,
    FindOneServiceByIdUseCase,
    UpdateServiceUseCase,
    DeleteServiceUseCase,
    {
      provide: 'ServiceRepositoryInterface',
      useExisting: ServiceTypeOrmRepository,
    },
  ],
  exports: [
    CreateServiceUseCase,
    ListAllServicesUseCase,
    FindOneServiceByIdUseCase,
    UpdateServiceUseCase,
    DeleteServiceUseCase,
  ],
})
export class ServicesModule {}
