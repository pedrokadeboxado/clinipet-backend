import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateUsuarioUseCase } from './updateUsuario.usecase';
import { UpdateUsuarioDto } from '../../models/dto/updateUsuario.dto';

@Controller('usuarios')
export class UpdateUsuarioController {
  constructor(private readonly useCase: UpdateUsuarioUseCase) {}

  @Patch(':id')
  handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUsuarioDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
