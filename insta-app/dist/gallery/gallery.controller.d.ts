import { GalleryService } from "./gallery.service";
import { CreateGalleryItemDto } from "./dto/create-gallery.dto";
import { Users } from "src/users/users.entity";
import * as Multer from "multer";
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    addGalleryPost(file: Multer.File, createGalleryItemDto: CreateGalleryItemDto, user: Users): Promise<import("./gallery.entity").GalleryItem>;
    findAll(limit: number): Promise<import("./gallery.entity").GalleryItem[]>;
    findById(id: number): Promise<import("./gallery.entity").GalleryItem>;
    findByUser(user: Users): Promise<import("./gallery.entity").GalleryItem[]>;
    deleteById(id: number, user: Users): Promise<void>;
}
