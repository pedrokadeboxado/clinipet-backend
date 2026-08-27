import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateVacinaUseCase } from './updateVacina.usecase';
import { UpdateVacinaDto } from '../../models/dto/updateVacina.dto';
@Controller('vacinas')
export class UpdateVacinaController {
  constructor(private readonly useCase: UpdateVacinaUseCase) {}
  @Patch(':id') handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateVacinaDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
