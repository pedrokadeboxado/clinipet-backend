import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListAllUsuariosUseCase } from './listAllUsuarios.usecase';

@ApiTags('Usuarios')
@Controller('usuarios')
export class ListAllUsuariosController {
  constructor(private readonly useCase: ListAllUsuariosUseCase) {}

  @Get()
  handle() {
    return this.useCase.execute();
  }
}
