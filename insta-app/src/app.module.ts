import { MiddlewareConsumer, Module } from "@nestjs/common";
// import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/users.entity";
import { AuthModule } from "./auth/auth.module";
import { GalleryModule } from "./gallery/gallery.module";
import { GalleryItem } from "./gallery/gallery.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CommentsModule } from "./comments/comments.module";
import { Comment } from "./comments/comments.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делаем модуль глобальным
      envFilePath: ".env", // Путь к .env файлу
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [Users, GalleryItem, Comment],
        synchronize: false,
      }),
    }),
    UsersModule,
    AuthModule,
    GalleryModule,
    CommentsModule,
  ],
  // controllers: [AppController, AuthModule],
  // providers: [],
})
export class AppModule {}
