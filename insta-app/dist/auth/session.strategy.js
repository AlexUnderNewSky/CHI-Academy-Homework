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
exports.SessionStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let SessionStrategy = class SessionStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(usersService) {
        super({
            usernameField: "username",
            passwordField: "password",
        });
        this.usersService = usersService;
    }
    async validate(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException("Invalid username or password");
        }
        return { id: user.id, username: user.username };
    }
};
exports.SessionStrategy = SessionStrategy;
exports.SessionStrategy = SessionStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], SessionStrategy);
//# sourceMappingURL=session.strategy.js.map