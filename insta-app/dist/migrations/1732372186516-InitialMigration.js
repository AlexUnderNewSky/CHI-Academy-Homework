"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1732372186516 = void 0;
class InitialMigration1732372186516 {
    constructor() {
        this.name = 'InitialMigration1732372186516';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.InitialMigration1732372186516 = InitialMigration1732372186516;
//# sourceMappingURL=1732372186516-InitialMigration.js.map