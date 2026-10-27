import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindOneTutorByIdUseCase } from './findOneTutorById.usecase';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('tutores')
@ApiTags('Tutores')

export class FindOneTutorByIdController {
  constructor(private readonly useCase: FindOneTutorByIdUseCase) {}
  @Get(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
