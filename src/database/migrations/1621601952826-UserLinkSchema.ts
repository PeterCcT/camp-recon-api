import {MigrationInterface, QueryRunner} from "typeorm";

export class UserLinkSchema1621601952826 implements MigrationInterface {
    name = 'UserLinkSchema1621601952826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "FK_14a562b14bb83fc8ba73d30d3e0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "FK_14a562b14bb83fc8ba73d30d3e0"`);
        await queryRunner.query(`DROP TABLE "link"`);
    }

}
