import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateServiceUseCase } from './updateService.usecase';
import { UpdateServiceDto } from '../../models/dto/updateService.dto';

@ApiTags('Serviços')
@Controller('services')
export class UpdateServiceController {
  constructor(private readonly useCase: UpdateServiceUseCase) { }

  @Patch(':id')
  handle(@Param('id') id: string, @Body() data: UpdateServiceDto) {
    return this.useCase.execute(Number(id), data);
  }
}
