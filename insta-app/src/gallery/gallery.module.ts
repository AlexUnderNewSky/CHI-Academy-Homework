import { Module } from "@nestjs/common";
import { GalleryController } from "./gallery.controller";
import { GalleryService } from "./gallery.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GalleryItem } from "./gallery.entity";
import { Comment } from "src/comments/comments.entity";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([GalleryItem, Comment]),
    NotificationsModule,
  ],
  exports: [TypeOrmModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
