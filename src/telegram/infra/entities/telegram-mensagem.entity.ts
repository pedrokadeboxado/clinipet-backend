import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type TelegramMensagemStatus =
  | 'enfileirada'
  | 'enviada'
  | 'falha'
  | 'respondida';

@Entity({ name: 'telegram_mensagens' })
@Index('IDX_telegram_mensagens_chat_msg', ['chatId', 'telegramMessageId'])
export class TelegramMensagemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chat_id', type: 'varchar' })
  chatId: string;

  @Column({ type: 'text' })
  texto: string;

  @Column({ type: 'varchar', default: 'enfileirada' })
  status: TelegramMensagemStatus;

  @Column({ name: 'telegram_message_id', type: 'integer', nullable: true })
  telegramMessageId: number | null;

  @Column({ name: 'agendamento_id', type: 'integer', nullable: true })
  agendamentoId: number | null;

  @Column({ type: 'varchar', nullable: true })
  tipo: string | null;

  @Column({ type: 'text', nullable: true })
  erro: string | null;

  @Column({ type: 'varchar', nullable: true })
  resposta: string | null;

  @Column({ name: 'enviada_em', type: 'timestamptz', nullable: true })
  enviadaEm: Date | null;

  @Column({ name: 'respondida_em', type: 'timestamptz', nullable: true })
  respondidaEm: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
