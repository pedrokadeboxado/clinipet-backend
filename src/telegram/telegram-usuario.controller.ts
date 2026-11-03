import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';

@ApiTags('Usuarios')
@Controller('usuarios')
export class TelegramUsuarioController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post(':id/telegram/codigo-vinculacao')
  @ApiOperation({
    summary: 'Gera o código de vínculo do Telegram para o tutor pelo id',
  })
  gerarCodigo(@Param('id', ParseIntPipe) id: number) {
    return this.telegramService.gerarCodigoVinculacao(id);
  }
}
