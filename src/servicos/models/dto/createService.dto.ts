import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

const toNumber = ({ value }: TransformFnParams) => {
  if (value === undefined || value === null || value === '') return value;
  return Number(value);
};

export class CreateServiceDto {
  @ApiProperty()
  @Transform(({ value }) => (value === undefined || value === null ? value : String(value)))
  @IsString()
  @IsNotEmpty()
  servico: string;

  @ApiProperty()
  @Transform(({ value }) => (value === undefined || value === null ? value : String(value)))
  @IsString()
  @IsNotEmpty()
  duracao_min: string;

  @ApiProperty()
  @Transform(toNumber)
  @IsNumber()
  @IsNotEmpty()
  valor: number;
}
