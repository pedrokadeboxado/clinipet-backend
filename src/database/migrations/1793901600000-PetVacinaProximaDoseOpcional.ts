import { MigrationInterface, QueryRunner } from 'typeorm';

export class PetVacinaProximaDoseOpcional1793901600000 implements MigrationInterface {
  name = 'PetVacinaProximaDoseOpcional1793901600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pet_vacina" ALTER COLUMN "data_proxima_dose" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "pet_vacina" SET "data_proxima_dose" = "data_aplicacao" WHERE "data_proxima_dose" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pet_vacina" ALTER COLUMN "data_proxima_dose" SET NOT NULL`,
    );
  }
}
