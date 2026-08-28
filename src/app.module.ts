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
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
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
