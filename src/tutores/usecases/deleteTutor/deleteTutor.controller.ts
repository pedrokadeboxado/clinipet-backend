import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteTutorUseCase } from './deleteTutor.usecase';
@Controller('tutores')
export class DeleteTutorController {
  constructor(private readonly useCase: DeleteTutorUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
