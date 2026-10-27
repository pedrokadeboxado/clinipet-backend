import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOneAgendamentoByIdUseCase } from './findOneAgendamentoById.usecase';

@ApiTags('Agendamentos')
@Controller('agendamentos')
export class FindOneAgendamentoByIdController {
  constructor(private readonly useCase: FindOneAgendamentoByIdUseCase) {}
  @Get(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
