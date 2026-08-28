import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOneUsuarioByIdUseCase } from './findOneUsuarioById.usecase';

@Controller('usuarios')
export class FindOneUsuarioByIdController {
  constructor(private readonly useCase: FindOneUsuarioByIdUseCase) {}

  @Get(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
