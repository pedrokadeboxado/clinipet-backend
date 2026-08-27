import { Module } from '@nestjs/common';
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
