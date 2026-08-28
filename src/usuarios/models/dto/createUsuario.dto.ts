import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UsuarioRole } from '../enum/usuarioRole';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  nome!: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(150)
  email!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  senha!: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
