import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateServiceUseCase } from './updateService.usecase';
import { UpdateServiceDto } from '../../models/dto/updateService.dto';
@Controller('services')
export class UpdateServiceController {
  constructor(private readonly useCase: UpdateServiceUseCase) {}
  @Patch(':id') handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateServiceDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
