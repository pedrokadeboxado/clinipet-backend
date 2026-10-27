import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateVacinaUseCase } from './updateVacina.usecase';
import { UpdateVacinaDto } from '../../models/dto/updateVacina.dto';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('vacinas')
@ApiTags('Vacinas')

export class UpdateVacinaController {
  constructor(private readonly useCase: UpdateVacinaUseCase) {}
  @Patch(':id') handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateVacinaDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
