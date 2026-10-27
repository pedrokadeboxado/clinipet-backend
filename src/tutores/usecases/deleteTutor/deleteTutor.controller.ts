import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteTutorUseCase } from './deleteTutor.usecase';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('tutores')
@ApiTags('Tutores')

export class DeleteTutorController {
  constructor(private readonly useCase: DeleteTutorUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
