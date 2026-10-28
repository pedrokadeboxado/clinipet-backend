import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUsuarioUseCase } from './deleteUsuario.usecase';

@ApiTags('Usuarios')
@Controller('usuarios')
export class DeleteUsuarioController {
  constructor(private readonly useCase: DeleteUsuarioUseCase) { }

  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
