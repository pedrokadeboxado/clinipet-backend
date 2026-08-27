import { Controller, Get } from '@nestjs/common';
import { ListAllPetVacinasUseCase } from './listAllPetVacinas.usecase';
@Controller('pet-vacina')
export class ListAllPetVacinasController {
  constructor(private readonly useCase: ListAllPetVacinasUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
