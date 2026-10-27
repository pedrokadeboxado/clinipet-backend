import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteVacinaUseCase } from './deleteVacina.usecase';
import { ApiTags } from '@nestjs/swagger';
@Controller('vacinas')
@ApiTags('Vacinas')

export class DeleteVacinaController {
  constructor(private readonly useCase: DeleteVacinaUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
