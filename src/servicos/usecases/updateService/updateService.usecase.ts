import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateServiceDto } from '../../models/dto/updateService.dto';
import { FindOneServiceByIdUseCase } from '../findOneServiceById/findOneServiceById.usecase';
import type { ServiceRepositoryInterface } from '../../models/interface/serviceRepositoryInterface';
export class UpdateServiceUseCase {
  constructor(
    @Inject('ServiceRepositoryInterface')
    private readonly repository: ServiceRepositoryInterface,
    private readonly findOne: FindOneServiceByIdUseCase,
  ) {}
  async execute(id: number, data: UpdateServiceDto) {
    await this.findOne.execute(id);
    const updatedService = await this.repository.update(id, data);
    if (!updatedService) throw new NotFoundException('Serviço não encontrado');
    return updatedService;
  }
}
