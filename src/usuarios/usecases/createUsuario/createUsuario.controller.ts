import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUsuarioUseCase } from './createUsuario.usecase';
import { CreateUsuarioDto } from '../../models/dto/createUsuario.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class CreateUsuarioController {
  constructor(private readonly useCase: CreateUsuarioUseCase) { }

  @Post()
  handle(@Body() data: CreateUsuarioDto) {
    return this.useCase.execute(data);
  }
}
