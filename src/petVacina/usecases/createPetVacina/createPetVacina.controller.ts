import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePetVacinaUseCase } from './createPetVacina.usecase';
import { CreatePetVacinaDto } from '../../models/dto/createPetVacina.dto';

@ApiTags('PetVacina')
@Controller('pet-vacina')
export class CreatePetVacinaController {
  constructor(private readonly useCase: CreatePetVacinaUseCase) {}
  @Post() handle(@Body() data: CreatePetVacinaDto) {
    return this.useCase.execute(data);
  }
}
