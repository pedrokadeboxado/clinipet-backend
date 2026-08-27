import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';
export class CreatePetVacinaDto {
  @ApiProperty() @IsDateString() data_aplicacao: string;
  @ApiProperty() @IsDateString() data_proxima_dose: string;
  @ApiProperty() @IsInt() id_pet: number;
  @ApiProperty() @IsInt() id_vacina: number;
}
