import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
export class CreateMessageDto {
  @ApiProperty() @IsString() text: string;
  @ApiProperty() @IsString() tipo: string;
  @ApiProperty() @IsString() enviado_em: string;
  @ApiProperty({ required: false }) @IsOptional() @IsBoolean() lida?: boolean;
  @ApiProperty() @IsInt() id_tutor: number;
  @ApiProperty() @IsInt() id_servico: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  id_pet_vacina?: number;
}
