import { Body, Controller, Post } from '@nestjs/common';
import { CreateTutorUseCase } from './createTutor.usecase';
import { CreateTutorDto } from '../../models/dto/createTutor.dto';
@Controller('tutores')
export class CreateTutorController {
  constructor(private readonly useCase: CreateTutorUseCase) {}
  @Post() handle(@Body() data: CreateTutorDto) {
    return this.useCase.execute(data);
  }
}
