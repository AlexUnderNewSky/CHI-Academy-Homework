import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GalleryItem } from "./gallery.entity";
import { Users } from "src/users/users.entity";
import { CreateGalleryItemDto } from "./dto/create-gallery.dto";
import * as fs from "fs";
import * as path from "path";
import * as Multer from "multer";

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryItem)
    private readonly galleryRepository: Repository<GalleryItem>
  ) {}

  async create(
    file: Multer.File,
    createGalleryItemDto: CreateGalleryItemDto,
    user: Users
  ): Promise<GalleryItem> {
    if (!file) {
      throw new BadRequestException("Image file is required");
    }

    const filePath = `images/${file.filename}`;
    const galleryItem = this.galleryRepository.create({
      imagePath: filePath,
      description: createGalleryItemDto.description,
      user,
    });

    return await this.galleryRepository.save(galleryItem);
  }

  async findAll(limit: number): Promise<GalleryItem[]> {
    return await this.galleryRepository.find({
      take: limit,
    });
  }

  async findById(id: number): Promise<GalleryItem> {
    const galleryItem = await this.galleryRepository.findOneBy({ id });
    if (!galleryItem) {
      throw new BadRequestException("Gallery item not found");
    }
    return galleryItem;
  }

  async findByUser(user: Users): Promise<GalleryItem[]> {
    return await this.galleryRepository.find({
      where: { user },
    });
  }

  async deleteById(id: number, user: Users): Promise<void> {
    const galleryItem = await this.findById(id);

    if (galleryItem.user.id !== user.id) {
      throw new ForbiddenException(
        "You do not have permission to delete this item"
      );
    }

    const filePath = path.resolve(galleryItem.imagePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.galleryRepository.remove(galleryItem);
  }
}
