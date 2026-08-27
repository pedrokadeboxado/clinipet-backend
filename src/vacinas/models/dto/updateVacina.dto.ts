import { PartialType } from '@nestjs/swagger';
import { CreateVacinaDto } from './createVacina.dto';
export class UpdateVacinaDto extends PartialType(CreateVacinaDto) {}
