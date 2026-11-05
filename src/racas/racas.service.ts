import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface RacaResponse {
  id: string;
  nome: string;
}

const CACHE_TTL_MS = 60 * 60 * 1000;

@Injectable()
export class RacasService {
  private readonly logger = new Logger(RacasService.name);
  private readonly cache = new Map<string, { expires: number; data: RacaResponse[] }>();

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async buscarRacas(especie?: string): Promise<RacaResponse[]> {
    const key = (especie ?? '').toLowerCase();
    let url: string;
    let apiKey: string | undefined;

    if (key === 'cachorro') {
      url = 'https://api.thedogapi.com/v1/breeds';
      apiKey = this.config.get<string>('DOG_API_KEY');
    } else if (key === 'gato') {
      url = 'https://api.thecatapi.com/v1/breeds';
      apiKey = this.config.get<string>('CAT_API_KEY');
    } else {
      throw new BadRequestException('Espécie inválida. Use "cachorro" ou "gato".');
    }

    const cached = this.cache.get(key);
    if (cached && cached.expires > Date.now()) return cached.data;

    try {
      const response = await firstValueFrom(
        this.httpService.get<{ id: string | number; name: string }[]>(url, {
          headers: apiKey ? { 'x-api-key': apiKey } : {},
        }),
      );
      const data = response.data.map((raca) => ({
        id: String(raca.id),
        nome: raca.name,
      }));
      this.cache.set(key, { expires: Date.now() + CACHE_TTL_MS, data });
      return data;
    } catch (error) {
      this.logger.error(
        `Falha ao consultar ${url}: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new BadGatewayException('Erro ao consultar a API externa de raças');
    }
  }
}
