import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdatePetUseCase } from './updatePet.usecase';
import { UpdatePetDto } from '../../models/dto/updatePet.dto';
@Controller('pets')
export class UpdatePetController {
  constructor(private readonly useCase: UpdatePetUseCase) {}
  @Patch(':id') handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePetDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
