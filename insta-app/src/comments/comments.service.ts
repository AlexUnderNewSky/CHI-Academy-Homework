import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./comments.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Users } from "../users/users.entity";
import { GalleryItem } from "../gallery/gallery.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(GalleryItem)
    private galleryRepository: Repository<GalleryItem>
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: Users
  ): Promise<Comment> {
    const post = await this.galleryRepository.findOneBy({
      id: createCommentDto.postId,
    });
    if (!post) {
      throw new NotFoundException("Gallery post not found");
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      post,
      user,
    });

    return await this.commentRepository.save(comment);
  }

  async findByPost(postId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: {
        user: true,
        post: true,
      },
    });
  }

  async delete(commentId: number, user: Users): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: {
        user: true,
      },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException("You can only delete your own comments");
    }

    await this.commentRepository.delete(commentId);
  }
}
