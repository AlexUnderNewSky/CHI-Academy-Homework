import { Module } from "@nestjs/common";
import { GalleryController } from "./gallery.controller";
import { GalleryService } from "./gallery.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GalleryItem } from "./gallery.entity";
import { Comment } from "src/comments/comments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GalleryItem, Comment])],
  exports: [TypeOrmModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
