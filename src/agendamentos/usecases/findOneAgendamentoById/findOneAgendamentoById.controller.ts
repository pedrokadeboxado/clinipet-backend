import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOneAgendamentoByIdUseCase } from './findOneAgendamentoById.usecase';
@Controller('agendamentos')
export class FindOneAgendamentoByIdController {
  constructor(private readonly useCase: FindOneAgendamentoByIdUseCase) {}
  @Get(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
