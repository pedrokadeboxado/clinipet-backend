import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOnePetVacinaByIdUseCase } from './findOnePetVacinaById.usecase';

@ApiTags('PetVacina')
@Controller('pet-vacina')
export class FindOnePetVacinaByIdController {
  constructor(private readonly useCase: FindOnePetVacinaByIdUseCase) {}

  @Get(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
