import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAgendamentoHorarioENotificacoes1793725200000 implements MigrationInterface {
  name = 'AddAgendamentoHorarioENotificacoes1793725200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "agendamentos" ALTER COLUMN "data_hora" TYPE TIMESTAMPTZ USING "data_hora"::timestamptz`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamentos" ADD "lembrete_enviado_em" TIMESTAMPTZ`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamentos" ADD "pronto_enviado_em" TIMESTAMPTZ`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "agendamentos" DROP COLUMN "pronto_enviado_em"`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamentos" DROP COLUMN "lembrete_enviado_em"`,
    );
    await queryRunner.query(
      `ALTER TABLE "agendamentos" ALTER COLUMN "data_hora" TYPE date USING "data_hora"::date`,
    );
  }
}
