import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOneAdminByIdUseCase } from './findOneAdminById.usecase';
@Controller('admin')
export class FindOneAdminByIdController {
  constructor(private readonly useCase: FindOneAdminByIdUseCase) {}
  @Get(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
