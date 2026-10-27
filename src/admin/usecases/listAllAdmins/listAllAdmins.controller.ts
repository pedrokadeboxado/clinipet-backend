import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListAllAdminsUseCase } from './listAllAdmins.usecase';

@ApiTags('Admin')
@Controller('admin')
export class ListAllAdminsController {
  constructor(private readonly useCase: ListAllAdminsUseCase) { }
  @Get()
  handle() {
    return this.useCase.execute();
  }
}
