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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService, configService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async findById(id) {
        return this.usersRepository.findOneBy({ id });
    }
    async findByUsername(username) {
        return this.usersRepository.findOneBy({ username });
    }
    async create(username, password) {
        const hashedPassword = await this.hashPassword(password);
        const existingUser = await this.usersRepository.findOneBy({ username });
        if (existingUser) {
            throw new common_1.BadRequestException("User with this username already exists");
        }
        const user = this.usersRepository.create({
            username,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async getProfileFromToken(token) {
        try {
            const secret = this.configService.get("JWT_SECRET");
            const decoded = this.jwtService.verify(token, { secret });
            const user = await this.findById(decoded.sub);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        }
        catch (error) {
            console.error("Error decoding token or fetching user:", error.message);
            throw new Error("Invalid token or user not found");
        }
    }
    async findBySession(userId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map