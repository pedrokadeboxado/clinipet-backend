import { Controller, Get } from '@nestjs/common';
import { ListAllPetsUseCase } from './listAllPets.usecase';
@Controller('pets')
export class ListAllPetsController {
  constructor(private readonly useCase: ListAllPetsUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
