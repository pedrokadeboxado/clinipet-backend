import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeletePetVacinaUseCase } from './deletePetVacina.usecase';
@Controller('pet-vacina')
export class DeletePetVacinaController {
  constructor(private readonly useCase: DeletePetVacinaUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
