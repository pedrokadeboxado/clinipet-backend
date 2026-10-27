import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminUseCase } from './createAdmin.usecase';
import { CreateAdminDto } from '../../models/dto/createAdmin.dto';

@ApiTags('Admin')
@Controller('admin')
export class CreateAdminController {
  constructor(private readonly useCase: CreateAdminUseCase) {}
  @Post()
  handle(@Body() data: CreateAdminDto) {
    return this.useCase.execute(data);
  }
}
