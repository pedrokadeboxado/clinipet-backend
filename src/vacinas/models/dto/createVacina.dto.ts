import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateVacinaDto {
  @ApiProperty() @IsString() vacina: string;
  @ApiProperty() @IsString() fabricante: string;
}
