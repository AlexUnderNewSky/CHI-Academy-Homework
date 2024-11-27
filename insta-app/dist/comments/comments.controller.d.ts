import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Users } from '../users/users.entity';
import { Comment } from './comments.entity';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(createCommentDto: CreateCommentDto, user: Users): Promise<Comment>;
    getCommentsByPost(postId: number): Promise<Comment[]>;
    deleteComment(id: number, user: Users): Promise<{
        message: string;
    }>;
}
