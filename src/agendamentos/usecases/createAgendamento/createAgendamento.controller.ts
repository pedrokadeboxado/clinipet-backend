import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAgendamentoUseCase } from './createAgendamento.usecase';
import { CreateAgendamentoDto } from '../../models/dto/createAgendamento.dto';

@ApiTags('Agendamentos')
@Controller('agendamentos')
export class CreateAgendamentoController {
  constructor(private readonly useCase: CreateAgendamentoUseCase) {}
  @Post() handle(@Body() data: CreateAgendamentoDto) {
    return this.useCase.execute(data);
  }
}
