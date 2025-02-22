import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1740238030118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL UNIQUE,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "password" character varying NOT NULL,
                "profilePicture" character varying,
                "rating" integer NOT NULL DEFAULT 1000,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
