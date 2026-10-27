import { Body, Controller, Post } from '@nestjs/common';
import { CreatePetUseCase } from './createPet.usecase';
import { CreatePetDto } from '../../models/dto/createPet.dto';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('pets')
@ApiTags('pets')

export class CreatePetController {
  constructor(private readonly useCase: CreatePetUseCase) {}
  @Post() handle(@Body() data: CreatePetDto) {
    return this.useCase.execute(data);
  }
}
