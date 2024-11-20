import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../entity/Users";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", // Укажите адрес сервера, если это не локальная БД
  port: 5432,        // Стандартный порт PostgreSQL
  username: "Samael", // Имя пользователя, созданного выше
  password: "12zx12zx", // Пароль для пользователя
  database: "lesson13", // Имя базы данных
  synchronize: true, // Установите `true`, если хотите, чтобы TypeORM автоматически синхронизировало структуру БД (не рекомендуется для production)
  logging: true,    // Включите, если хотите видеть SQL-запросы в консоли
  entities: [Users, "/entities/*.ts"], // Путь к вашим сущностям
  migrations: ["/migrations/*.ts"], // Путь к миграциям
});