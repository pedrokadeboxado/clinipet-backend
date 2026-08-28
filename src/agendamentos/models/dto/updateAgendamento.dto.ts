import { PartialType } from '@nestjs/swagger';
import { CreateAgendamentoDto } from './createAgendamento.dto';
export class UpdateAgendamentoDto extends PartialType(CreateAgendamentoDto) {}
