import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateServiceDto {
  @ApiProperty() @IsString() servico: string;
  @ApiProperty() @IsString() duracao_min: string;
  @ApiProperty() @IsString() valor: string;
}
