import { MigrationInterface, QueryRunner } from 'typeorm';

export class Results1740238064744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "results" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "winnerId" uuid NOT NULL,
                "loserId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "matchId" uuid UNIQUE,
                CONSTRAINT "REL_match_result" FOREIGN KEY ("matchId") 
                    REFERENCES "matches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "fk_winner" FOREIGN KEY ("winnerId") 
                    REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "fk_loser" FOREIGN KEY ("loserId") 
                    REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "results"`);
  }
}
