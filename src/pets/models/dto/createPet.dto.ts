import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
export class CreatePetDto {
  @ApiProperty() @IsString() raca: string;
  @ApiProperty() @IsString() nome: string;
  @ApiProperty() @IsInt() id_tutor: number;
}
