import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731891407552 implements MigrationInterface {
    name = 'Default1731891407552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_type"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_deleted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_deleted" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_type" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying(100) NOT NULL`);
    }

}
