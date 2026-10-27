import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeletePetVacinaUseCase } from './deletePetVacina.usecase';
@ApiTags('PetVacina')
@Controller('pet-vacina')
export class DeletePetVacinaController {
  constructor(private readonly useCase: DeletePetVacinaUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
