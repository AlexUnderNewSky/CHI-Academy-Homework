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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const common_1 = require("@nestjs/common");
const gallery_service_1 = require("./gallery.service");
const create_gallery_dto_1 = require("./dto/create-gallery.dto");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const users_entity_1 = require("../users/users.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
const Multer = require("multer");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const class_transformer_1 = require("class-transformer");
const gallery_entity_1 = require("./gallery.entity");
let GalleryController = class GalleryController {
    constructor(galleryService) {
        this.galleryService = galleryService;
    }
    async addGalleryPost(file, createGalleryItemDto, user) {
        if (!file) {
            throw new common_1.BadRequestException("Image file is required");
        }
        const createdPost = await this.galleryService.create(file, createGalleryItemDto, user);
        return (0, class_transformer_1.plainToInstance)(gallery_entity_1.GalleryItem, createdPost, {
            excludeExtraneousValues: true,
        });
    }
    async findAll(limit) {
        const posts = await this.galleryService.findAll(limit || 10);
        return posts.map((post) => (0, class_transformer_1.plainToInstance)(gallery_entity_1.GalleryItem, post, { excludeExtraneousValues: true }));
    }
    async findById(id) {
        const post = await this.galleryService.findById(id);
        return (0, class_transformer_1.plainToInstance)(gallery_entity_1.GalleryItem, post, {
            excludeExtraneousValues: true,
        });
    }
    async findByUser(user) {
        const post = await this.galleryService.findByUser(user);
        return (0, class_transformer_1.plainToInstance)(gallery_entity_1.GalleryItem, post, {
            excludeExtraneousValues: true,
        });
    }
    async deleteById(id, user) {
        return await this.galleryService.deleteById(id, user);
    }
};
exports.GalleryController = GalleryController;
__decorate([
    (0, common_1.Post)("add-post"),
    (0, swagger_1.ApiOperation)({ summary: "Add a new post to the gallery" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        description: "Gallery post data with image file",
        schema: {
            type: "object",
            properties: {
                image: {
                    type: "string",
                    format: "binary",
                    description: "The image file to upload",
                },
                description: {
                    type: "string",
                    description: "Description of the gallery post",
                },
            },
            required: ["image", "description"],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Post successfully created",
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - image file is required",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", {
        storage: (0, multer_1.diskStorage)({
            destination: "./images",
            filename: (req, file, callback) => {
                const ext = path.extname(file.originalname);
                callback(null, `${(0, uuid_1.v4)()}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof Multer !== "undefined" && Multer.File) === "function" ? _a : Object, create_gallery_dto_1.CreateGalleryItemDto,
        users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "addGalleryPost", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get a list of all gallery posts" }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        description: "Number of posts to fetch",
        schema: { type: "integer", default: 10 },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Successfully fetched posts",
    }),
    __param(0, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a gallery post by ID" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID of the gallery post",
        schema: { type: "integer" },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Post fetched successfully",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Post not found",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)("/user/me"),
    (0, swagger_1.ApiOperation)({ summary: "Get gallery posts of the current user" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User's posts fetched successfully",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a gallery post by ID" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID of the gallery post to delete",
        schema: { type: "integer" },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Post deleted successfully",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden - user not authorized to delete this post",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Post not found",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "deleteById", null);
exports.GalleryController = GalleryController = __decorate([
    (0, swagger_1.ApiTags)("gallery"),
    (0, common_1.Controller)("gallery"),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService])
], GalleryController);
//# sourceMappingURL=gallery.controller.js.map