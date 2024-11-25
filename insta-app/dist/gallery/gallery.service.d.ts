import { Repository } from "typeorm";
import { GalleryItem } from "./gallery.entity";
import { Users } from "src/users/users.entity";
import { CreateGalleryItemDto } from "./dto/create-gallery.dto";
import * as Multer from "multer";
export declare class GalleryService {
    private readonly galleryRepository;
    constructor(galleryRepository: Repository<GalleryItem>);
    create(file: Multer.File, createGalleryItemDto: CreateGalleryItemDto, user: Users): Promise<GalleryItem>;
    findAll(limit: number): Promise<GalleryItem[]>;
    findById(id: number): Promise<GalleryItem>;
    findByUser(user: Users): Promise<GalleryItem[]>;
    deleteById(id: number, user: Users): Promise<void>;
}
