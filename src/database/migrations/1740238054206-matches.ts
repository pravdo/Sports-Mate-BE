import { MigrationInterface, QueryRunner } from 'typeorm';

export class Matches1740238054206 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."matches_status_enum" AS ENUM(
                'PENDING', 
                'ACCEPTED', 
                'REJECTED', 
                'COMPLETED', 
                'CANCELLED'
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "matches" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "sport" character varying NOT NULL,
                "scheduledTime" TIMESTAMP NOT NULL,
                "status" "public"."matches_status_enum" NOT NULL DEFAULT 'PENDING',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "player1Id" uuid,
                "player2Id" uuid,
                CONSTRAINT "fk_player1" FOREIGN KEY ("player1Id") 
                    REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "fk_player2" FOREIGN KEY ("player2Id") 
                    REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "matches"`);
    await queryRunner.query(`DROP TYPE "public"."matches_status_enum"`);
  }
}
