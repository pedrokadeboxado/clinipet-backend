import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOnePetVacinaByIdUseCase } from './findOnePetVacinaById.usecase';
@Controller('pet-vacina')
export class FindOnePetVacinaByIdController {
  constructor(private readonly useCase: FindOnePetVacinaByIdUseCase) {}
  @Get(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
