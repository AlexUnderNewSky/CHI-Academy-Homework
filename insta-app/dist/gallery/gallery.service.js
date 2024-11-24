"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const gallery_entity_1 = require("./gallery.entity");
const fs = require("fs");
const path = require("path");
let GalleryService = class GalleryService {
    constructor(galleryRepository) {
        this.galleryRepository = galleryRepository;
    }
    async create(file, createGalleryItemDto, user) {
        if (!file) {
            throw new common_1.NotFoundException('Image file is required');
        }
        const filePath = `images/${file.filename}`;
        const galleryItem = this.galleryRepository.create({
            imagePath: filePath,
            description: createGalleryItemDto.description,
            user,
        });
        return await this.galleryRepository.save(galleryItem);
    }
    async findAll(limit) {
        return await this.galleryRepository.find({
            take: limit,
        });
    }
    async findById(id) {
        const galleryItem = await this.galleryRepository.findOneBy({ id });
        if (!galleryItem) {
            throw new common_1.NotFoundException('Gallery item not found');
        }
        return galleryItem;
    }
    async findByUser(user) {
        return await this.galleryRepository.find({
            where: { user },
        });
    }
    async deleteById(id, user) {
        const galleryItem = await this.findById(id);
        if (galleryItem.user.id !== user.id) {
            throw new common_1.ForbiddenException('You do not have permission to delete this item');
        }
        const filePath = path.resolve(galleryItem.imagePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await this.galleryRepository.remove(galleryItem);
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(gallery_entity_1.GalleryItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map