import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTelegramTutorLinkFields1793638800000 implements MigrationInterface {
  name = 'AddTelegramTutorLinkFields1793638800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tutores" ADD "telegram_chat_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tutores" ADD "telegram_link_code_hash" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tutores" ADD "telegram_link_code_expires_at" TIMESTAMPTZ`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_tutores_telegram_chat_id" ON "tutores" ("telegram_chat_id") WHERE "telegram_chat_id" IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "UQ_tutores_telegram_chat_id"`);
    await queryRunner.query(
      `ALTER TABLE "tutores" DROP COLUMN "telegram_link_code_expires_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tutores" DROP COLUMN "telegram_link_code_hash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tutores" DROP COLUMN "telegram_chat_id"`,
    );
  }
}
