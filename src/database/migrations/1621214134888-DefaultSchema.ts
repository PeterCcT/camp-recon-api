import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultSchema1621214134888 implements MigrationInterface {
    name = 'DefaultSchema1621214134888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_a761331f20634c53bf660312062" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "upload_date" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_8be2bf37ccaf41c13720c89eb83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "phone" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "occupation" character varying NOT NULL, "resume" character varying NOT NULL, "categorieId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "image_url" character varying, "userId" uuid, CONSTRAINT "PK_441339f40e8ce717525a381671e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gallery_image" ADD CONSTRAINT "FK_7a7843ff46f046c40133db55684" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_cf28dfec6e27666e0430f2b9420" FOREIGN KEY ("categorieId") REFERENCES "categorie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "achievement" ADD CONSTRAINT "FK_61ea514b7a1ee99bc55c310bac9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "achievement" DROP CONSTRAINT "FK_61ea514b7a1ee99bc55c310bac9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_cf28dfec6e27666e0430f2b9420"`);
        await queryRunner.query(`ALTER TABLE "gallery_image" DROP CONSTRAINT "FK_7a7843ff46f046c40133db55684"`);
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "gallery_image"`);
        await queryRunner.query(`DROP TABLE "categorie"`);
    }

}
