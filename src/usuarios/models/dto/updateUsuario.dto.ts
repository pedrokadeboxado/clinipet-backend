import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './createUsuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
