import { Controller, Get } from '@nestjs/common';
import { ListAllServicesUseCase } from './listAllServices.usecase';
@Controller('services')
export class ListAllServicesController {
  constructor(private readonly useCase: ListAllServicesUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
