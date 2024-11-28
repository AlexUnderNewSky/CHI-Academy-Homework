import { DataSource } from "typeorm";
import { Users } from "./users/users.entity";
import { GalleryItem } from "./gallery/gallery.entity";
import { Comment } from "./comments/comments.entity";
import { config } from 'dotenv';
config();

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST, // Используем переменные из .env
  port: parseInt(process.env.DB_PORT || '5432'), // Преобразуем в число
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ["./src/migrations/*.ts"],
  synchronize: false,
  entities: [Users, GalleryItem, Comment],
});
