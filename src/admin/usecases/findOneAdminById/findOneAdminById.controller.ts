import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOneAdminByIdUseCase } from './findOneAdminById.usecase';

@ApiTags('Admin')
@Controller('admin')
export class FindOneAdminByIdController {
  constructor(private readonly useCase: FindOneAdminByIdUseCase) { }

  @Get(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
