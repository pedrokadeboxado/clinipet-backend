import { Body, Controller, Post } from '@nestjs/common';
import { CreatePetVacinaUseCase } from './createPetVacina.usecase';
import { CreatePetVacinaDto } from '../../models/dto/createPetVacina.dto';
@Controller('pet-vacina')
export class CreatePetVacinaController {
  constructor(private readonly useCase: CreatePetVacinaUseCase) {}
  @Post() handle(@Body() data: CreatePetVacinaDto) {
    return this.useCase.execute(data);
  }
}
