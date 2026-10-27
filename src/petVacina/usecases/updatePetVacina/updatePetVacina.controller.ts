import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePetVacinaUseCase } from './updatePetVacina.usecase';
import { UpdatePetVacinaDto } from '../../models/dto/updatePetVacina.dto';

@ApiTags('PetVacina')
@Controller('pet-vacina')
export class UpdatePetVacinaController {
  constructor(private readonly useCase: UpdatePetVacinaUseCase) { }

  @Patch(':id')
  handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePetVacinaDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
