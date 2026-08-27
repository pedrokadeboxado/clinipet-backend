import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioUseCase } from './createUsuario.usecase';
import { CreateUsuarioDto } from '../../models/dto/createUsuario.dto';

@Controller('usuarios')
export class CreateUsuarioController {
  constructor(private readonly useCase: CreateUsuarioUseCase) {}

  @Post()
  handle(@Body() data: CreateUsuarioDto) {
    return this.useCase.execute(data);
  }
}
