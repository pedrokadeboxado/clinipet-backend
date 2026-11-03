import { BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { of } from 'rxjs';
import { createHash } from 'node:crypto';
import { TelegramService } from './telegram.service';

jest.mock('@nestjs/axios', () => ({
  HttpService: class HttpService {},
}));

jest.mock('@nestjs/config', () => ({
  ConfigService: class ConfigService {},
}));

describe('TelegramService', () => {
  const environment: Record<string, string> = {
    TELEGRAM_BOT_TOKEN: 'bot-token',
    TELEGRAM_WEBHOOK_SECRET: 'webhook-secret',
    TELEGRAM_LINKING_SECRET: 'linking-secret',
  };
  let tutorRepository: {
    findOne: jest.Mock;
    update: jest.Mock;
  };
  let httpService: { post: jest.Mock };
  let service: TelegramService;

  beforeEach(() => {
    tutorRepository = {
      findOne: jest.fn(),
      update: jest.fn(),
    };
    httpService = {
      post: jest.fn().mockReturnValue(of({ data: { ok: true } })),
    };
    service = new TelegramService(
      tutorRepository as never,
      httpService as never,
      { get: jest.fn((key: string) => environment[key]) } as never,
    );
  });

  it('creates a short-lived code and stores only its hash', async () => {
    tutorRepository.findOne.mockResolvedValue({ id: 12, nome: 'João' });
    tutorRepository.update.mockResolvedValue({ affected: 1 });

    const result = await service.criarCodigoVinculacao(12, 'linking-secret');

    expect(result.code).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(result.expiresAt.getTime()).toBeGreaterThan(Date.now());
    expect(tutorRepository.update).toHaveBeenCalledWith(
      12,
      expect.objectContaining({
        telegramLinkCodeHash: createHash('sha256')
          .update(result.code)
          .digest('hex'),
        telegramLinkCodeExpiresAt: result.expiresAt,
      }),
    );
    expect(result.code).not.toBe(
      tutorRepository.update.mock.calls[0][1].telegramLinkCodeHash,
    );
  });

  it('rejects link-code requests without the internal secret', async () => {
    await expect(
      service.criarCodigoVinculacao(12, 'wrong-secret'),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(tutorRepository.findOne).not.toHaveBeenCalled();
  });

  it('links the Telegram chat and consumes the code once', async () => {
    tutorRepository.findOne
      .mockResolvedValueOnce({ id: 12, nome: 'João' })
      .mockResolvedValueOnce(null);
    tutorRepository.update.mockResolvedValue({ affected: 1 });

    await service.processarAtualizacao(
      {
        message: {
          chat: { id: 987654 },
          text: '/start one-time-code',
        },
      },
      'webhook-secret',
    );

    expect(tutorRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 12,
        telegramLinkCodeHash: createHash('sha256')
          .update('one-time-code')
          .digest('hex'),
      }),
      {
        telegramChatId: '987654',
        telegramLinkCodeHash: null,
        telegramLinkCodeExpiresAt: null,
      },
    );
    expect(httpService.post).toHaveBeenCalledWith(
      'https://api.telegram.org/botbot-token/sendMessage',
      {
        chat_id: '987654',
        text: expect.stringContaining('Telegram vinculado com sucesso, João!'),
      },
      { timeout: 10_000 },
    );
  });

  it('does not link a chat when the code is invalid or expired', async () => {
    tutorRepository.findOne.mockResolvedValue(null);

    await service.processarAtualizacao(
      { message: { chat: { id: 987654 }, text: 'invalid-code' } },
      'webhook-secret',
    );

    expect(tutorRepository.update).not.toHaveBeenCalled();
    expect(httpService.post).toHaveBeenCalledWith(
      'https://api.telegram.org/botbot-token/sendMessage',
      {
        chat_id: '987654',
        text: expect.stringContaining('Código inválido ou expirado'),
      },
      { timeout: 10_000 },
    );
  });

  it('reports Telegram delivery failures', async () => {
    tutorRepository.findOne
      .mockResolvedValueOnce({ id: 12, nome: 'João' })
      .mockResolvedValueOnce(null);
    tutorRepository.update.mockResolvedValue({ affected: 1 });
    httpService.post.mockReturnValueOnce(of({ data: { ok: false } }));

    await expect(
      service.processarAtualizacao(
        {
          message: {
            chat: { id: 987654 },
            text: '/start one-time-code',
          },
        },
        'webhook-secret',
      ),
    ).rejects.toBeInstanceOf(BadGatewayException);
  });
});
