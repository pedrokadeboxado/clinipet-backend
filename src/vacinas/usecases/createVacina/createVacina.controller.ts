import { Body, Controller, Post } from '@nestjs/common';
import { CreateVacinaUseCase } from './createVacina.usecase';
import { CreateVacinaDto } from '../../models/dto/createVacina.dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('vacinas')
@ApiTags('Vacinas')
export class CreateVacinaController {
  constructor(private readonly useCase: CreateVacinaUseCase) {}
  @Post() handle(@Body() data: CreateVacinaDto) {
    return this.useCase.execute(data);
  }
}
