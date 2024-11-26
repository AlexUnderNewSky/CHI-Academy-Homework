import { Module } from "@nestjs/common";
// import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/users.entity";
import { AuthModule } from "./auth/auth.module";
import { GalleryModule } from './gallery/gallery.module';
import { GalleryItem } from "./gallery/gallery.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "Samael",
      password: "12zx12zx",
      database: "insta",
      entities: [Users, GalleryItem],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    GalleryModule,
  ],
  // controllers: [AppController, AuthModule],
  // providers: [],
})
export class AppModule {}
