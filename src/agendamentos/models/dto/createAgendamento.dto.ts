import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';
export class CreateAgendamentoDto {
  @ApiProperty() @IsDateString() horario: string;
  @ApiProperty() @IsDateString() data_hora: string;
  @ApiProperty() @IsString() status: string;
  @ApiProperty() @IsInt() id_pet: number;
  @ApiProperty() @IsInt() id_servico: number;
}
