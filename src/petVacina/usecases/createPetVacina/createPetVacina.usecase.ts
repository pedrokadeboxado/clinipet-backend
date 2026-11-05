import { Inject } from '@nestjs/common';
import { TelegramConfirmacaoService } from '../../../telegram/telegram-confirmacao.service';
import { PetVacinaEntity } from '../../infra/entities/petVacina.entity';
import type { PetVacinaRepositoryInterface } from '../../models/interface/petVacinaRepositoryInterface';
export class CreatePetVacinaUseCase {
  constructor(
    @Inject('PetVacinaRepositoryInterface')
    private readonly repository: PetVacinaRepositoryInterface,
    private readonly confirmacao: TelegramConfirmacaoService,
  ) {}
  async execute(data: Partial<PetVacinaEntity>) {
    const registro = await this.repository.create(data);
    await this.confirmacao.confirmarVacinacao(registro.id);
    return registro;
  }
}
