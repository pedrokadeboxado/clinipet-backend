import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListAllServicesUseCase } from './listAllServices.usecase';

@ApiTags('Serviços')
@Controller('services')
export class ListAllServicesController {
  constructor(private readonly useCase: ListAllServicesUseCase) { }

  @Get()
  handle() {
    return this.useCase.execute();
  }
}
