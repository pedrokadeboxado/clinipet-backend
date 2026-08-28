import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PetVacinaEntity } from '../../../petVacina/infra/entities/petVacina.entity';

@Entity({ name: 'vacinas' })
export class VacinaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  vacina: string;

  @Column({ type: 'varchar' })
  fabricante: string;

  @OneToMany(() => PetVacinaEntity, (petVacina) => petVacina.vacina)
  petVacinas: PetVacinaEntity[];
}
