import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUsuarioUseCase } from './deleteUsuario.usecase';

@ApiTags('Usuarios')
@Controller('usuarios')
export class DeleteUsuarioController {
  constructor(private readonly useCase: DeleteUsuarioUseCase) {}

  @Delete(':id')
  handle(@Param('id') id: string) {
    return this.useCase.execute(Number(id));
  }
}
