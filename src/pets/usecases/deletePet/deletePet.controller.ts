import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeletePetUseCase } from './deletePet.usecase';
import { ApiTags } from 'node_modules/@nestjs/swagger/dist/decorators/api-use-tags.decorator';
@Controller('pets')
@ApiTags('pets')

export class DeletePetController {
  constructor(private readonly useCase: DeletePetUseCase) {}
  @Delete(':id') handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
