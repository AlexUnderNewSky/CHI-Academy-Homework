import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { AuthService } from "src/auth/auth.service";
import { ConfigModule } from "@nestjs/config";
import { GalleryItem } from "src/gallery/gallery.entity";
import { AuthModule } from "src/auth/auth.module";
import { Comment } from "src/comments/comments.entity";

@Module({
  imports: [
    ConfigModule, // Импорт ConfigModule для работы с переменными окружения
    TypeOrmModule.forFeature([Users, GalleryItem, Comment]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
