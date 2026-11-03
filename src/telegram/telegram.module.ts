import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorEntity } from '../tutores/infra/entities/tutor.entity';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TutorEntity])],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
