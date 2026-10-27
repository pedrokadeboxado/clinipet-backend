import { Controller, Get } from '@nestjs/common';
import { ListAllVacinasUseCase } from './listAllVacinas.usecase';
import { ApiTags } from '@nestjs/swagger';
@Controller('vacinas')
@ApiTags('Vacinas')

export class ListAllVacinasController {
  constructor(private readonly useCase: ListAllVacinasUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
