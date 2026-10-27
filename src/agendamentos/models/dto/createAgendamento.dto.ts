import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';
export class CreateAgendamentoDto {
  @ApiProperty() @IsDateString() data_hora: Date;
  @ApiProperty() @IsString() status: string;
  @ApiProperty() @IsInt() id_pet: number;
  @ApiProperty() @IsInt() id_servico: number;
}
