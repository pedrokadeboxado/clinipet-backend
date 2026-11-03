import { TelegramNotificacoesService } from './telegram-notificacoes.service';

jest.mock('@nestjs/config', () => ({
  ConfigService: class ConfigService {},
}));
jest.mock('@nestjs/axios', () => ({
  HttpService: class HttpService {},
}));
jest.mock('@nestjs/schedule', () => ({
  Cron: () => () => undefined,
  CronExpression: { EVERY_MINUTE: '* * * * *' },
}));

describe('TelegramNotificacoesService', () => {
  const now = new Date('2026-11-03T13:30:00.000Z');
  let candidatos: unknown[];
  let repository: { createQueryBuilder: jest.Mock; update: jest.Mock };
  let telegram: { enviarMensagem: jest.Mock };
  let service: TelegramNotificacoesService;

  const agendamento = (dataHora: string, duracao = '30') => ({
    id: 1,
    data_hora: new Date(dataHora),
    pet: { nome: 'Rex', tutor: { nome: 'João', telegramChatId: '555' } },
    service: { servico: 'Banho', duracao_min: duracao },
  });

  beforeEach(() => {
    candidatos = [];
    const qb = {
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn(() => Promise.resolve(candidatos)),
    };
    repository = {
      createQueryBuilder: jest.fn().mockReturnValue(qb),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
    };
    telegram = { enviarMensagem: jest.fn().mockResolvedValue(undefined) };
    service = new TelegramNotificacoesService(
      repository as never,
      telegram as never,
      { get: jest.fn() } as never,
    );
  });

  it('sends a reminder for an upcoming appointment', async () => {
    candidatos = [agendamento('2026-11-03T14:00:00.000Z')];

    await service.enviarLembretes(now);

    expect(telegram.enviarMensagem).toHaveBeenCalledWith(
      '555',
      expect.stringContaining('Rex tem Banho agendado para 03/11, 11:00'),
    );
    expect(repository.update).toHaveBeenCalledWith(
      { id: 1, lembrete_enviado_em: expect.anything() },
      { lembrete_enviado_em: expect.any(Date) },
    );
  });

  it('notifies pickup once the service duration has elapsed', async () => {
    candidatos = [agendamento('2026-11-03T13:00:00.000Z', '30')];

    await service.enviarAvisosDeProntidao(now);

    expect(telegram.enviarMensagem).toHaveBeenCalledWith(
      '555',
      expect.stringContaining('Rex está pronto(a) para a retirada'),
    );
  });

  it('does not notify pickup before the service ends', async () => {
    candidatos = [agendamento('2026-11-03T13:15:00.000Z', '30')];

    await service.enviarAvisosDeProntidao(now);

    expect(telegram.enviarMensagem).not.toHaveBeenCalled();
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('does not notify stale appointments', async () => {
    candidatos = [agendamento('2026-11-02T10:00:00.000Z', '30')];

    await service.enviarAvisosDeProntidao(now);

    expect(telegram.enviarMensagem).not.toHaveBeenCalled();
  });

  it('skips sending when another run already claimed the notice', async () => {
    candidatos = [agendamento('2026-11-03T14:00:00.000Z')];
    repository.update.mockResolvedValue({ affected: 0 });

    await service.enviarLembretes(now);

    expect(telegram.enviarMensagem).not.toHaveBeenCalled();
  });

  it('releases the notice for retry when Telegram fails', async () => {
    candidatos = [agendamento('2026-11-03T14:00:00.000Z')];
    telegram.enviarMensagem.mockRejectedValue(new Error('down'));

    await service.enviarLembretes(now);

    expect(repository.update).toHaveBeenLastCalledWith(1, {
      lembrete_enviado_em: null,
    });
  });
});
