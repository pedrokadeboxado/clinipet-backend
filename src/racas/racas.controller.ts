import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RacasService } from './racas.service';

@ApiTags('racas')
@Controller('racas')
export class RacasController {
  constructor(private readonly racasService: RacasService) {}

  @Get()
  @ApiQuery({ name: 'especie', enum: ['cachorro', 'gato'] })
  buscarRacas(@Query('especie') especie: string) {
    return this.racasService.buscarRacas(especie);
  }
}
