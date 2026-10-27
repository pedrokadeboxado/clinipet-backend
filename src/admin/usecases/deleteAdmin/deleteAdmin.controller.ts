import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteAdminUseCase } from './deleteAdmin.usecase';

@ApiTags('Admin')
@Controller('admin')
export class DeleteAdminController {
  constructor(private readonly useCase: DeleteAdminUseCase) {}

  @Delete(':id')
  handle(@Param('id') id: string) {
    return this.useCase.execute(Number(id));
  }
}
