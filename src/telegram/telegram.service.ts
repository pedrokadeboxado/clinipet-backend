import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { MoreThan, QueryFailedError, Repository } from 'typeorm';
import { TutorEntity } from '../tutores/infra/entities/tutor.entity';
import { TelegramUpdateDto } from './dto/telegram-update.dto';

const LINK_CODE_TTL_MS = 15 * 60 * 1000;

interface TelegramApiResponse {
  ok: boolean;
}

@Injectable()
export class TelegramService {
  constructor(
    @InjectRepository(TutorEntity)
    private readonly tutorRepository: Repository<TutorEntity>,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async criarCodigoVinculacao(
    tutorId: number,
    linkingSecret: string | undefined,
  ) {
    this.validarSegredo(
      this.config.get<string>('TELEGRAM_LINKING_SECRET'),
      linkingSecret,
      'TELEGRAM_LINKING_SECRET não está configurado.',
    );

    const tutor = await this.tutorRepository.findOne({
      where: { id: tutorId },
    });
    if (!tutor) throw new NotFoundException('Tutor não encontrado');

    const code = randomBytes(24).toString('base64url');
    const expiresAt = new Date(Date.now() + LINK_CODE_TTL_MS);
    const updateResult = await this.tutorRepository.update(tutorId, {
      telegramLinkCodeHash: this.hashCode(code),
      telegramLinkCodeExpiresAt: expiresAt,
    });
    if (!updateResult.affected)
      throw new NotFoundException('Tutor não encontrado');

    return { code, expiresAt };
  }

  async processarAtualizacao(
    update: TelegramUpdateDto,
    webhookSecret: string | undefined,
  ): Promise<void> {
    this.validarSegredo(
      this.config.get<string>('TELEGRAM_WEBHOOK_SECRET'),
      webhookSecret,
      'TELEGRAM_WEBHOOK_SECRET não está configurado.',
    );

    const message = update.message;
    const text = message?.text?.trim();
    if (!message || !text) return;

    const startCommand = text.match(/^\/start(?:@\w+)?(?:\s+(.+))?$/i);
    const code = startCommand ? startCommand[1]?.trim() : text;
    const chatId = String(message.chat.id);

    if (!code) {
      await this.enviarMensagem(
        chatId,
        'Olá! Para vincular sua conta, solicite um código à equipe da CliniPet e envie-o aqui.',
      );
      return;
    }

    const codeHash = this.hashCode(code);
    const now = new Date();
    const tutor = await this.tutorRepository.findOne({
      where: {
        telegramLinkCodeHash: codeHash,
        telegramLinkCodeExpiresAt: MoreThan(now),
      },
    });

    if (!tutor) {
      await this.enviarMensagem(
        chatId,
        'Código inválido ou expirado. Solicite um novo código à equipe da CliniPet.',
      );
      return;
    }

    const existingTutor = await this.tutorRepository.findOne({
      where: { telegramChatId: chatId },
    });
    if (existingTutor && existingTutor.id !== tutor.id) {
      await this.enviarMensagem(
        chatId,
        'Esta conta do Telegram já está vinculada a outro tutor. Entre em contato com a equipe da CliniPet.',
      );
      return;
    }

    let updateResult;
    try {
      updateResult = await this.tutorRepository.update(
        {
          id: tutor.id,
          telegramLinkCodeHash: codeHash,
          telegramLinkCodeExpiresAt: MoreThan(now),
        },
        {
          telegramChatId: chatId,
          telegramLinkCodeHash: null,
          telegramLinkCodeExpiresAt: null,
        },
      );
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === '23505'
      ) {
        await this.enviarMensagem(
          chatId,
          'Esta conta do Telegram já está vinculada a outro tutor. Entre em contato com a equipe da CliniPet.',
        );
        return;
      }
      throw error;
    }

    if (!updateResult.affected) {
      await this.enviarMensagem(
        chatId,
        'Código inválido ou expirado. Solicite um novo código à equipe da CliniPet.',
      );
      return;
    }

    await this.enviarMensagem(
      chatId,
      `Telegram vinculado com sucesso, ${tutor.nome}! Você receberá por aqui os avisos da CliniPet.`,
    );
  }

  private async enviarMensagem(chatId: string, text: string): Promise<void> {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token) {
      throw new InternalServerErrorException(
        'TELEGRAM_BOT_TOKEN não está configurado.',
      );
    }

    let response;
    try {
      response = await firstValueFrom(
        this.httpService.post<TelegramApiResponse>(
          `https://api.telegram.org/bot${token}/sendMessage`,
          { chat_id: chatId, text },
          { timeout: 10_000 },
        ),
      );
    } catch (error) {
      throw new BadGatewayException(
        'Não foi possível enviar a mensagem pelo Telegram.',
        { cause: error },
      );
    }

    if (!response.data.ok) {
      throw new BadGatewayException('O Telegram recusou o envio da mensagem.');
    }
  }

  private hashCode(code: string): string {
    return createHash('sha256').update(code).digest('hex');
  }

  private validarSegredo(
    expected: string | undefined,
    received: string | undefined,
    missingConfigMessage: string,
  ): void {
    if (!expected) {
      throw new InternalServerErrorException(missingConfigMessage);
    }
    if (!received) throw new UnauthorizedException('Segredo inválido');

    const expectedBuffer = Buffer.from(expected);
    const receivedBuffer = Buffer.from(received);
    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      throw new UnauthorizedException('Segredo inválido');
    }
  }
}
