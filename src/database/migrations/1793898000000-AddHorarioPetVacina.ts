import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHorarioPetVacina1793898000000 implements MigrationInterface {
  name = 'AddHorarioPetVacina1793898000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pet_vacina" ALTER COLUMN "data_aplicacao" TYPE TIMESTAMPTZ USING "data_aplicacao"::timestamptz`,
    );
    await queryRunner.query(
      `ALTER TABLE "pet_vacina" ALTER COLUMN "data_proxima_dose" TYPE TIMESTAMPTZ USING "data_proxima_dose"::timestamptz`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pet_vacina" ALTER COLUMN "data_proxima_dose" TYPE date USING "data_proxima_dose"::date`,
    );
    await queryRunner.query(
      `ALTER TABLE "pet_vacina" ALTER COLUMN "data_aplicacao" TYPE date USING "data_aplicacao"::date`,
    );
  }
}
