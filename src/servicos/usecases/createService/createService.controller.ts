import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateServiceUseCase } from './createService.usecase';
import { CreateServiceDto } from '../../models/dto/createService.dto';

@ApiTags('Serviços')
@Controller('services')
export class CreateServiceController {
  constructor(private readonly useCase: CreateServiceUseCase) {}
  @Post() handle(@Body() data: CreateServiceDto) {
    return this.useCase.execute(data);
  }
}
