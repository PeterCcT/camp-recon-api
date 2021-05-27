import {MigrationInterface, QueryRunner} from "typeorm";

export class AchievementDescription1622126038712 implements MigrationInterface {
    name = 'AchievementDescription1622126038712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "achievement" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "achievement" ALTER COLUMN "description" SET NOT NULL`);
    }

}
