import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamentoEntity } from '../agendamentos/infra/entities/agendamento.entity';
import { TutorEntity } from '../tutores/infra/entities/tutor.entity';
import { TelegramMensagemEntity } from './infra/entities/telegram-mensagem.entity';
import { TelegramController } from './telegram.controller';
import { TelegramConfirmacaoService } from './telegram-confirmacao.service';
import { PetVacinaEntity } from '../petVacina/infra/entities/petVacina.entity';
import { TelegramUsuarioController } from './telegram-usuario.controller';
import { TelegramNotificacoesService } from './telegram-notificacoes.service';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      TutorEntity,
      AgendamentoEntity,
      PetVacinaEntity,
      TelegramMensagemEntity,
    ]),
  ],
  controllers: [TelegramController, TelegramUsuarioController],
  providers: [
    TelegramService,
    TelegramNotificacoesService,
    TelegramConfirmacaoService,
  ],
  exports: [TelegramConfirmacaoService],
})
export class TelegramModule {}
