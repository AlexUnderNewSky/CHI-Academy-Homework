"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users/users.entity");
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "Samael",
    password: "12zx12zx",
    database: "insta",
    migrations: ["./src/migrations/*.ts"],
    synchronize: false,
    entities: [users_entity_1.Users],
});
//# sourceMappingURL=ormconfig.js.map