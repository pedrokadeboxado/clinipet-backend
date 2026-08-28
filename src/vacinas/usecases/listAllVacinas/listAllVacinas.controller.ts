import { Controller, Get } from '@nestjs/common';
import { ListAllVacinasUseCase } from './listAllVacinas.usecase';
@Controller('vacinas')
export class ListAllVacinasController {
  constructor(private readonly useCase: ListAllVacinasUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
