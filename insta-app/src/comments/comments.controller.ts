import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Users } from '../users/users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Comment } from './comments.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new comment to a gallery post' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async createComment(@Body() createCommentDto: CreateCommentDto, @GetUser() user: Users) {
    const comment = await this.commentService.create(createCommentDto, user);
    // Преобразуем ответ с использованием plainToInstance для фильтрации данных
    return plainToInstance(Comment, comment, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for a specific gallery post' })
  @ApiResponse({ status: 200, description: 'Successfully fetched comments' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async getCommentsByPost(@Query('postId') postId: number) {
    const comments = await this.commentService.findByPost(postId);

    if (!comments.length) {
      throw new NotFoundException('No comments found for this post');
    }

    // Преобразуем ответ с использованием plainToInstance для фильтрации данных
    return plainToInstance(Comment, comments, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'ID of the comment to delete' })
  @ApiResponse({ status: 204, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async deleteComment(@Param('id') id: number, @GetUser() user: Users) {
    await this.commentService.delete(id, user);
    return { message: 'Comment deleted successfully' };
  }
}