import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TutoresModule } from './tutores/tutores.module';
import { PetsModule } from './pets/pets.module';
import { VacinasModule } from './vacinas/vacinas.module';
import { PetVacinaModule } from './petVacina/petVacina.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { ServicesModule } from './servicos/services.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'test/.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbPassword = configService.get<string>('DB_PASSWORD');

        if (!dbPassword) {
          throw new Error('DB_PASSWORD is missing. Check the .env file at the project root or under test/.env.');
        }

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT') ?? 5432),
          username: configService.get<string>('DB_USERNAME'),
          password: dbPassword,
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    AdminModule,
    TutoresModule,
    PetsModule,
    VacinasModule,
    PetVacinaModule,
    AgendamentosModule,
    ServicesModule,
    // MessagesModule,
    UsuariosModule,
  ],
  providers: [AppService],
})
export class AppModule { }
