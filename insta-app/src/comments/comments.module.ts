import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { GalleryItem } from '../gallery/gallery.entity';
import { Users } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, GalleryItem, Users])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentsModule {}
