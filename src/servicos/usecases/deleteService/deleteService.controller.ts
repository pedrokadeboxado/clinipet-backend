import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteServiceUseCase } from './deleteService.usecase';
@ApiTags('Serviços')
@Controller('services')
export class DeleteServiceController {
  constructor(private readonly useCase: DeleteServiceUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
