import { Controller, Get } from '@nestjs/common';
import { ListAllUsuariosUseCase } from './listAllUsuarios.usecase';

@Controller('usuarios')
export class ListAllUsuariosController {
  constructor(private readonly useCase: ListAllUsuariosUseCase) {}

  @Get()
  handle() {
    return this.useCase.execute();
  }
}
