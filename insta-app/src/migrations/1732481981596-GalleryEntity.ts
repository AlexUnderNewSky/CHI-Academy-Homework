import { MigrationInterface, QueryRunner } from "typeorm";

export class GalleryEntity1732481981596 implements MigrationInterface {
    name = 'GalleryEntity1732481981596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "galleryItems" ("id" SERIAL NOT NULL, "imagePath" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_bb206e43902d427e450d989205d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "galleryItems" ADD CONSTRAINT "FK_282101d180203f95555f6b9134d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "galleryItems" DROP CONSTRAINT "FK_282101d180203f95555f6b9134d"`);
        await queryRunner.query(`DROP TABLE "galleryItems"`);
    }

}
