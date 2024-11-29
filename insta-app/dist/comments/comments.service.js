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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comments_entity_1 = require("./comments.entity");
const gallery_entity_1 = require("../gallery/gallery.entity");
let CommentService = class CommentService {
    constructor(commentRepository, galleryRepository) {
        this.commentRepository = commentRepository;
        this.galleryRepository = galleryRepository;
    }
    async create(createCommentDto, user) {
        const post = await this.galleryRepository.findOneBy({
            id: createCommentDto.postId,
        });
        if (!post) {
            throw new common_1.NotFoundException("Gallery post not found");
        }
        const comment = this.commentRepository.create({
            content: createCommentDto.content,
            post,
            user,
        });
        return await this.commentRepository.save(comment);
    }
    async findByPost(postId) {
        return await this.commentRepository.find({
            where: { post: { id: postId } },
            relations: {
                user: true,
                post: true,
            },
        });
    }
    async delete(commentId, user) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId },
            relations: {
                user: true,
            },
        });
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        if (comment.user.id !== user.id) {
            throw new common_1.ForbiddenException("You can only delete your own comments");
        }
        await this.commentRepository.delete(commentId);
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comments_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(gallery_entity_1.GalleryItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comments.service.js.map