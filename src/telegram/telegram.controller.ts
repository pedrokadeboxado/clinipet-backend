import {
  Body,
  Controller,
  Headers,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TelegramUpdateDto } from './dto/telegram-update.dto';
import { TelegramService } from './telegram.service';

@ApiTags('Telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('tutores/:tutorId/codigo-vinculacao')
  @ApiOperation({
    summary: 'Gera um código temporário de vínculo com Telegram',
  })
  criarCodigoVinculacao(
    @Param('tutorId', ParseIntPipe) tutorId: number,
    @Headers('x-telegram-linking-secret') linkingSecret: string | undefined,
  ) {
    return this.telegramService.criarCodigoVinculacao(tutorId, linkingSecret);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Recebe atualizações do bot do Telegram' })
  receberAtualizacao(
    @Body() update: TelegramUpdateDto,
    @Headers('x-telegram-bot-api-secret-token')
    webhookSecret: string | undefined,
  ) {
    return this.telegramService.processarAtualizacao(update, webhookSecret);
  }
}
