import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListAllPetVacinasUseCase } from './listAllPetVacinas.usecase';

@ApiTags('PetVacina')
@Controller('pet-vacina')
export class ListAllPetVacinasController {
  constructor(private readonly useCase: ListAllPetVacinasUseCase) {}

  @Get()
  handle() {
    return this.useCase.execute();
  }
}
