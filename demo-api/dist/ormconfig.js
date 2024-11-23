"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./users/user.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "lesson13",
    password: "password",
    database: "lesson13",
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
    entities: [user_entity_1.User]
});
//# sourceMappingURL=ormconfig.js.map