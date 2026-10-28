import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { EspeciePet } from '../enum/especiePet.enum';

export class CreatePetDto {
  @ApiProperty() @IsString() raca: string;
  @ApiProperty() @IsString() nome: string;
  @ApiProperty({ enum: EspeciePet })
  @IsEnum(EspeciePet)
  especie: EspeciePet;
  @ApiProperty() @IsInt() id_tutor: number;
}
