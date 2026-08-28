import { PartialType } from '@nestjs/swagger';
import { CreatePetVacinaDto } from './createPetVacina.dto';
export class UpdatePetVacinaDto extends PartialType(CreatePetVacinaDto) {}
