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
const user_entity_1 = require("./user.entity");
const create_user_dto_1 = require("./dto/create-user.dto");
const MinLoginLength = 4;
const MinPasswordLength = 4;
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getAllUsers(id, username) {
        if (!id && !username) {
            throw new common_1.NotFoundException('ID или username должны быть указаны');
        }
        const user = id ?
            await this.usersService.findById(id) :
            await this.usersService.findByUsername(username);
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return (0, class_transformer_1.plainToInstance)(user_entity_1.User, user, { excludeExtraneousValues: true });
    }
    async register(createUserDto) {
        if ((!createUserDto.username || !createUserDto.password) ||
            (createUserDto.username.length < MinLoginLength) || (createUserDto.password.length < MinPasswordLength)) {
            throw new common_1.BadRequestException(`Длинна пароля и логина должна быть не меньше ${MinLoginLength} символов`);
        }
        const user = this.usersService.create(createUserDto.username, createUserDto.password);
        return (0, class_transformer_1.plainToInstance)(user_entity_1.User, user, { excludeExtraneousValues: true });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка пользователей' }),
    (0, swagger_1.ApiQuery)({ name: 'id', required: false, description: 'ID пользователя' }),
    (0, swagger_1.ApiQuery)({ name: 'username', required: false, description: 'Имя пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Успешное получение списка пользователей' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Пользователи не найдены' }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация нового пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Пользователь успешно зарегистрирован' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map