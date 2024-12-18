"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const auth_service_1 = require("../auth/auth.service");
const config_1 = require("@nestjs/config");
const gallery_entity_1 = require("../gallery/gallery.entity");
const auth_module_1 = require("../auth/auth.module");
const comments_entity_1 = require("../comments/comments.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users, gallery_entity_1.GalleryItem, comments_entity_1.Comment]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [users_controller_1.UsersController],
        exports: [users_service_1.UsersService],
        providers: [users_service_1.UsersService, auth_service_1.AuthService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map