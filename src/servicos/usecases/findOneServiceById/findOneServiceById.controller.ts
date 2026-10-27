import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindOneServiceByIdUseCase } from './findOneServiceById.usecase';

@ApiTags('Serviços')
@Controller('services')
export class FindOneServiceByIdController {
  constructor(private readonly useCase: FindOneServiceByIdUseCase) { }
  @Get(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
