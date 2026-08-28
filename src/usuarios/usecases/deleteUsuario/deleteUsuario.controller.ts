import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteUsuarioUseCase } from './deleteUsuario.usecase';

@Controller('usuarios')
export class DeleteUsuarioController {
  constructor(private readonly useCase: DeleteUsuarioUseCase) {}

  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
