import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateAgendamentoUseCase } from './updateAgendamento.usecase';
import { UpdateAgendamentoDto } from '../../models/dto/updateAgendamento.dto';
@Controller('agendamentos')
export class UpdateAgendamentoController {
  constructor(private readonly useCase: UpdateAgendamentoUseCase) {}
  @Patch(':id') handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAgendamentoDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
