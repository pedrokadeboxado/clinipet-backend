import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListAllAgendamentosUseCase } from './listAllAgendamentos.usecase';

@ApiTags('Agendamentos')
@Controller('agendamentos')
export class ListAllAgendamentosController {
  constructor(private readonly useCase: ListAllAgendamentosUseCase) { }
  @Get() handle() {
    return this.useCase.execute();
  }
}
