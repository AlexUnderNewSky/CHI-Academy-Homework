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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryItem = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const class_transformer_1 = require("class-transformer");
const comments_entity_1 = require("../comments/comments.entity");
let GalleryItem = class GalleryItem {
};
exports.GalleryItem = GalleryItem;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GalleryItem.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GalleryItem.prototype, "imagePath", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GalleryItem.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.gallery, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", users_entity_1.Users)
], GalleryItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], GalleryItem.prototype, "comments", void 0);
exports.GalleryItem = GalleryItem = __decorate([
    (0, typeorm_1.Entity)("galleryItems")
], GalleryItem);
//# sourceMappingURL=gallery.entity.js.map