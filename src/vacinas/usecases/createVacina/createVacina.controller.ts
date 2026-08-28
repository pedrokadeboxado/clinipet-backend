import { Body, Controller, Post } from '@nestjs/common';
import { CreateVacinaUseCase } from './createVacina.usecase';
import { CreateVacinaDto } from '../../models/dto/createVacina.dto';
@Controller('vacinas')
export class CreateVacinaController {
  constructor(private readonly useCase: CreateVacinaUseCase) {}
  @Post() handle(@Body() data: CreateVacinaDto) {
    return this.useCase.execute(data);
  }
}
