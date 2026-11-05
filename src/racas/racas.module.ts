import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RacasController } from './racas.controller';
import { RacasService } from './racas.service';

@Module({
  imports: [HttpModule],
  controllers: [RacasController],
  providers: [RacasService],
})
export class RacasModule {}
