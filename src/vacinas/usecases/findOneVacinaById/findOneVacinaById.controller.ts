import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOneVacinaByIdUseCase } from './findOneVacinaById.usecase';
import { ApiTags } from '@nestjs/swagger';
@Controller('vacinas')
@ApiTags('Vacinas')

export class FindOneVacinaByIdController {
  constructor(private readonly useCase: FindOneVacinaByIdUseCase) {}
  @Get(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
