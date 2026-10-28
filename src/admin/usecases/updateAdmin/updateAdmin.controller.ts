import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAdminUseCase } from './updateAdmin.usecase';
import { UpdateAdminDto } from '../../models/dto/updateAdmin.dto';

@ApiTags('Admin')
@Controller('admin')
export class UpdateAdminController {
  constructor(private readonly useCase: UpdateAdminUseCase) { }

  @Patch(':id')
  handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAdminDto,
  ) {
    return this.useCase.execute(id, data);
  }
}
