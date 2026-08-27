import { Body, Controller, Post } from '@nestjs/common';
import { CreateServiceUseCase } from './createService.usecase';
import { CreateServiceDto } from '../../models/dto/createService.dto';
@Controller('services')
export class CreateServiceController {
  constructor(private readonly useCase: CreateServiceUseCase) {}
  @Post() handle(@Body() data: CreateServiceDto) {
    return this.useCase.execute(data);
  }
}
