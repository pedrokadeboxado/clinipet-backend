import { Controller, Get } from '@nestjs/common';
import { ListAllTutorsUseCase } from './listAllTutors.usecase';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('tutores')
@ApiTags('Tutores')

export class ListAllTutorsController {
  constructor(private readonly useCase: ListAllTutorsUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
