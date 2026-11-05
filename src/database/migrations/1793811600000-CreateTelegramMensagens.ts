import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTelegramMensagens1793811600000 implements MigrationInterface {
  name = 'CreateTelegramMensagens1793811600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "telegram_mensagens" (
        "id" SERIAL NOT NULL,
        "chat_id" character varying NOT NULL,
        "texto" text NOT NULL,
        "status" character varying NOT NULL DEFAULT 'enfileirada',
        "telegram_message_id" integer,
        "agendamento_id" integer,
        "tipo" character varying,
        "erro" text,
        "resposta" character varying,
        "enviada_em" TIMESTAMPTZ,
        "respondida_em" TIMESTAMPTZ,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_telegram_mensagens" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_telegram_mensagens_chat_msg" ON "telegram_mensagens" ("chat_id", "telegram_message_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_telegram_mensagens_chat_msg"`);
    await queryRunner.query(`DROP TABLE "telegram_mensagens"`);
  }
}
