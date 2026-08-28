import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteAgendamentoUseCase } from './deleteAgendamento.usecase';
@Controller('agendamentos')
export class DeleteAgendamentoController {
  constructor(private readonly useCase: DeleteAgendamentoUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
