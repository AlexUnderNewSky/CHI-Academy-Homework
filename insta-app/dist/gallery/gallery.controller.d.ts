import { GalleryService } from "./gallery.service";
import { CreateGalleryItemDto } from "./dto/create-gallery.dto";
import { Users } from "src/users/users.entity";
import * as Multer from "multer";
import { GalleryItem } from "./gallery.entity";
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    addGalleryPost(file: Multer.File, createGalleryItemDto: CreateGalleryItemDto, user: Users): Promise<GalleryItem>;
    findAll(limit: number): Promise<GalleryItem[]>;
    findById(id: number): Promise<GalleryItem>;
    findByUser(user: Users): Promise<GalleryItem[]>;
    deleteById(id: number, user: Users): Promise<void>;
}
