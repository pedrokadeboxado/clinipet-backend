import { PartialType } from '@nestjs/swagger';
import { CreateTutorDto } from './createTutor.dto';
export class UpdateTutorDto extends PartialType(CreateTutorDto) {}
