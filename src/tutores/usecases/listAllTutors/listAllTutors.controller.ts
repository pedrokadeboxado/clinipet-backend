import { Controller, Get } from '@nestjs/common';
import { ListAllTutorsUseCase } from './listAllTutors.usecase';
@Controller('tutores')
export class ListAllTutorsController {
  constructor(private readonly useCase: ListAllTutorsUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
