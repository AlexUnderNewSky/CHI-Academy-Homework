import { GalleryItem } from '../gallery/gallery.entity';
export declare class Users {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    gallery: GalleryItem[];
}
