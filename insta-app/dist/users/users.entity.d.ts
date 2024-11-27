import { GalleryItem } from "../gallery/gallery.entity";
import { Comment } from "../comments/comments.entity";
export declare class Users {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    gallery: GalleryItem[];
    comments: Comment[];
}
