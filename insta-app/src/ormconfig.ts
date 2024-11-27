import { DataSource } from "typeorm";
import { Users } from "./users/users.entity";
import { GalleryItem } from "./gallery/gallery.entity";
import { Comment } from "./comments/comments.entity";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "Samael",
  password: "12zx12zx",
  database: "insta",
  migrations: ["./src/migrations/*.ts"],
  synchronize: false,
  entities: [Users, GalleryItem, Comment],
});
