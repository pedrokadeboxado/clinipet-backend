import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOneTutorByIdUseCase } from './findOneTutorById.usecase';
@Controller('tutores')
export class FindOneTutorByIdController {
  constructor(private readonly useCase: FindOneTutorByIdUseCase) {}
  @Get(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
