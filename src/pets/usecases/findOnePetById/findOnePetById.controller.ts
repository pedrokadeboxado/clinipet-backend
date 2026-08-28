import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOnePetByIdUseCase } from './findOnePetById.usecase';
@Controller('pets')
export class FindOnePetByIdController {
  constructor(private readonly useCase: FindOnePetByIdUseCase) {}
  @Get(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
