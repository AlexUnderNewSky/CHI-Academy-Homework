import { Repository } from "typeorm";
import { Comment } from "./comments.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Users } from "../users/users.entity";
import { GalleryItem } from "../gallery/gallery.entity";
export declare class CommentService {
    private commentRepository;
    private galleryRepository;
    constructor(commentRepository: Repository<Comment>, galleryRepository: Repository<GalleryItem>);
    create(createCommentDto: CreateCommentDto, user: Users): Promise<Comment>;
    findByPost(postId: number): Promise<Comment[]>;
    delete(commentId: number, user: Users): Promise<void>;
}
