import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';
import { IsNotPastDate } from './isNotPastDate.decorator';
export class CreateAgendamentoDto {
  @ApiProperty() @IsDateString() @IsNotPastDate() data_hora: Date;
  @ApiProperty() @IsInt() id_pet: number;
  @ApiProperty() @IsInt() id_servico: number;
}
