import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateTutorUseCase } from './updateTutor.usecase';
import { UpdateTutorDto } from '../../models/dto/updateTutor.dto';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('tutores')
@ApiTags('Tutores')

export class UpdateTutorController {
  constructor(private readonly useCase: UpdateTutorUseCase) {}
  @Patch(':id') handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTutorDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
