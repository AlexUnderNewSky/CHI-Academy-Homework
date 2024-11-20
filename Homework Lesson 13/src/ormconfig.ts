import { DataSource } from "typeorm";
import { Users } from "./entity/Users";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "Samael",
  password: "12zx12zx",
  database: "lesson13",
  migrations: ["./src/migrations/*.ts"],
  synchronize: true,
  entities: [Users, __dirname + "/entities/**/*.entity.ts"],
});
