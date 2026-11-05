import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropMessages1793905200000 implements MigrationInterface {
  name = 'DropMessages1793905200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "messages"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" SERIAL NOT NULL, "text" text NOT NULL, "tipo" character varying NOT NULL, "enviado_em" character varying NOT NULL, "lida" boolean NOT NULL DEFAULT false, "id_tutor" integer, "id_servico" integer, "id_pet_vacina" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
  }
}
