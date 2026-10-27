import { Controller, Get } from '@nestjs/common';
import { ListAllPetsUseCase } from './listAllPets.usecase';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('pets')
@ApiTags('pets')

export class ListAllPetsController {
  constructor(private readonly useCase: ListAllPetsUseCase) {}
  @Get() handle() {
    return this.useCase.execute();
  }
}
