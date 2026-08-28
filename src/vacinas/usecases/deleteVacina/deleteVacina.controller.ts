import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteVacinaUseCase } from './deleteVacina.usecase';
@Controller('vacinas')
export class DeleteVacinaController {
  constructor(private readonly useCase: DeleteVacinaUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
