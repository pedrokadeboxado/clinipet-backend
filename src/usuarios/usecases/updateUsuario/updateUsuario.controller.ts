import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUsuarioUseCase } from './updateUsuario.usecase';
import { UpdateUsuarioDto } from '../../models/dto/updateUsuario.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UpdateUsuarioController {
  constructor(private readonly useCase: UpdateUsuarioUseCase) {}

  @Patch(':id')
  handle(@Param('id') id: string, @Body() data: UpdateUsuarioDto) {
    return this.useCase.execute(Number(id), data);
  }
}
