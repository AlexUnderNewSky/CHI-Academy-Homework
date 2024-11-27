import { Users } from "../users/users.entity";
import { Comment } from "../comments/comments.entity";
export declare class GalleryItem {
    id: number;
    imagePath: string;
    description: string;
    user: Users;
    comments: Comment[];
}
