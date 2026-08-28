import { Controller, Get } from '@nestjs/common';
import { ListAllAgendamentosUseCase } from './listAllAgendamentos.usecase';
@Controller('agendamentos')
export class ListAllAgendamentosController {
  constructor(private readonly useCase: ListAllAgendamentosUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
