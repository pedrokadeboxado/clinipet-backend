import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1793542371277 implements MigrationInterface {
    name = 'InitialSchema1793542371277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tutores" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying(150), "telefone" character varying(20), CONSTRAINT "PK_fdb2e70ac9a26d6a5095c87b681" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "servico" character varying NOT NULL, "duracao_min" character varying NOT NULL, "valor" numeric(10,2) NOT NULL, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agendamentos" ("id" SERIAL NOT NULL, "data_hora" date NOT NULL, "status" character varying DEFAULT 'pendente', "id_pet" integer NOT NULL, "id_servico" integer NOT NULL, CONSTRAINT "PK_3890b7448ebc7efdfd1d43bf0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pets_especie_enum" AS ENUM('cachorro', 'gato', 'outro')`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" SERIAL NOT NULL, "raca" character varying NOT NULL, "nome" character varying NOT NULL, "especie" "public"."pets_especie_enum", "id_tutor" integer NOT NULL, CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet_vacina" ("id" SERIAL NOT NULL, "data_aplicacao" date NOT NULL, "data_proxima_dose" date NOT NULL, "id_pet" integer NOT NULL, "id_vacina" integer NOT NULL, CONSTRAINT "PK_b2a150733279381c6d946f9814c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vacinas" ("id" SERIAL NOT NULL, "vacina" character varying NOT NULL, "fabricante" character varying NOT NULL, CONSTRAINT "PK_e16f61530d871f2b74346c233ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying(150) NOT NULL, "cpf" character varying(20) NOT NULL, "email" character varying(150) NOT NULL, "senha" character varying(255) NOT NULL, "role" character varying(50) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "text" text NOT NULL, "tipo" character varying NOT NULL, "enviado_em" character varying NOT NULL, "lida" boolean NOT NULL DEFAULT false, "id_tutor" integer, "id_servico" integer, "id_pet_vacina" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_23cb629a90ef3c76e73789e72b9" FOREIGN KEY ("id_pet") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_33dbf1be4885ad16229e95110b4" FOREIGN KEY ("id_servico") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_aa80866fb55912824cb98a7f637" FOREIGN KEY ("id_tutor") REFERENCES "tutores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet_vacina" ADD CONSTRAINT "FK_c8a2cebe0b16c2be8e7f18a0e12" FOREIGN KEY ("id_pet") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet_vacina" ADD CONSTRAINT "FK_b72de1bf0fe43e7758c8e4e4484" FOREIGN KEY ("id_vacina") REFERENCES "vacinas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pet_vacina" DROP CONSTRAINT "FK_b72de1bf0fe43e7758c8e4e4484"`);
        await queryRunner.query(`ALTER TABLE "pet_vacina" DROP CONSTRAINT "FK_c8a2cebe0b16c2be8e7f18a0e12"`);
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_aa80866fb55912824cb98a7f637"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_33dbf1be4885ad16229e95110b4"`);
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_23cb629a90ef3c76e73789e72b9"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "vacinas"`);
        await queryRunner.query(`DROP TABLE "pet_vacina"`);
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TYPE "public"."pets_especie_enum"`);
        await queryRunner.query(`DROP TABLE "agendamentos"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "tutores"`);
    }

}
