import { Controller, Get } from '@nestjs/common';
import { ListAllAdminsUseCase } from './listAllAdmins.usecase';
@Controller('admin')
export class ListAllAdminsController {
  constructor(private readonly useCase: ListAllAdminsUseCase) {}
  @Get()
  handle() {
    return this.useCase.execute();
  }
}
