import { Users } from '../users/users.entity';
import { GalleryItem } from '../gallery/gallery.entity';
export declare class Comment {
    id: number;
    content: string;
    user: Users;
    post: GalleryItem;
}
