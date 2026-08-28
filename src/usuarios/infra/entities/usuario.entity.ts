import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nome!: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  senha!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  role!: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  ativo!: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm!: Date;
}
