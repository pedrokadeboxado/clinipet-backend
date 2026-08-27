import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './infra/entities/usuario.entity';
import { UsuarioTypeOrmRepository } from './infra/repositories/usuarioTypeOrm.repository';
import { CreateUsuarioController } from './usecases/createUsuario/createUsuario.controller';
import { CreateUsuarioUseCase } from './usecases/createUsuario/createUsuario.usecase';
import { ListAllUsuariosController } from './usecases/listAllUsuarios/listAllUsuarios.controller';
import { ListAllUsuariosUseCase } from './usecases/listAllUsuarios/listAllUsuarios.usecase';
import { FindOneUsuarioByIdController } from './usecases/findOneUsuarioById/findOneUsuarioById.controller';
import { FindOneUsuarioByIdUseCase } from './usecases/findOneUsuarioById/findOneUsuarioById.usecase';
import { UpdateUsuarioController } from './usecases/updateUsuario/updateUsuario.controller';
import { UpdateUsuarioUseCase } from './usecases/updateUsuario/updateUsuario.usecase';
import { DeleteUsuarioController } from './usecases/deleteUsuario/deleteUsuario.controller';
import { DeleteUsuarioUseCase } from './usecases/deleteUsuario/deleteUsuario.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [
    CreateUsuarioController,
    ListAllUsuariosController,
    FindOneUsuarioByIdController,
    UpdateUsuarioController,
    DeleteUsuarioController,
  ],
  providers: [
    UsuarioTypeOrmRepository,
    CreateUsuarioUseCase,
    ListAllUsuariosUseCase,
    FindOneUsuarioByIdUseCase,
    UpdateUsuarioUseCase,
    DeleteUsuarioUseCase,
    {
      provide: 'UsuarioRepositoryInterface',
      useExisting: UsuarioTypeOrmRepository,
    },
  ],
  exports: [
    CreateUsuarioUseCase,
    ListAllUsuariosUseCase,
    FindOneUsuarioByIdUseCase,
    UpdateUsuarioUseCase,
    DeleteUsuarioUseCase,
  ],
})
export class UsuariosModule {}
