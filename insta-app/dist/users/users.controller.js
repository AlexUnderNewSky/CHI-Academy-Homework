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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const users_entity_1 = require("./users.entity");
const create_user_dto_1 = require("./dto/create-user.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const auth_service_1 = require("../auth/auth.service");
const MinLoginLength = 4;
const MinPasswordLength = 4;
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async register(createUserDto) {
        if (!createUserDto.username ||
            !createUserDto.password ||
            createUserDto.username.length < MinLoginLength ||
            createUserDto.password.length < MinPasswordLength) {
            throw new common_1.BadRequestException(`Password and login length must be at least ${MinLoginLength} characters`);
        }
        const user = this.usersService.create(createUserDto.username, createUserDto.password);
        return (0, class_transformer_1.plainToInstance)(users_entity_1.Users, user, { excludeExtraneousValues: true });
    }
    async getAllUsers(id, username) {
        if (!id && !username) {
            throw new common_1.BadRequestException("ID or user must be provided");
        }
        const user = id
            ? await this.usersService.findById(id)
            : await this.usersService.findByUsername(username);
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        return (0, class_transformer_1.plainToInstance)(users_entity_1.Users, user, { excludeExtraneousValues: true });
    }
    async getProfile(req) {
        console.log(req.user);
        const token = this.authService.extractTokenFromRequest(req);
        if (!token) {
            throw new Error("Token is required");
        }
        const user = await this.usersService.getProfileFromToken(token);
        return {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Register new user" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Successfully registered new user",
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad request" }),
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all users" }),
    (0, swagger_1.ApiQuery)({ name: "id", required: false, description: "User ID" }),
    (0, swagger_1.ApiQuery)({ name: "username", required: false, description: "User name" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Successfully get all users" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "User not authorized" }),
    __param(0, (0, common_1.Query)("id")),
    __param(1, (0, common_1.Query)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)("my-profile"),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiOperation)({ summary: "Get info about current user" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "User profile fetched successfully",
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("users | Login/Register for User"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map