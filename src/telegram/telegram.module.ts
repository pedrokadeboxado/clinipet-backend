import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamentoEntity } from '../agendamentos/infra/entities/agendamento.entity';
import { TutorEntity } from '../tutores/infra/entities/tutor.entity';
import { TelegramController } from './telegram.controller';
import { TelegramNotificacoesService } from './telegram-notificacoes.service';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([TutorEntity, AgendamentoEntity]),
  ],
  controllers: [TelegramController],
  providers: [TelegramService, TelegramNotificacoesService],
})
export class TelegramModule {}
