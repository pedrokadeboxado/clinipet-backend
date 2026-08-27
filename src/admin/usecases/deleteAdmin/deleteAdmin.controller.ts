import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { DeleteAdminUseCase } from './deleteAdmin.usecase';
@Controller('admin')
export class DeleteAdminController {
  constructor(private readonly useCase: DeleteAdminUseCase) {}
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.execute(id);
  }
}
