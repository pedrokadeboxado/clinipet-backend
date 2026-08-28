import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteServiceUseCase } from './deleteService.usecase';
@Controller('services')
export class DeleteServiceController {
  constructor(private readonly useCase: DeleteServiceUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
