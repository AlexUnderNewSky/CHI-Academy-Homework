import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Отклоняет истёкшие токены
      secretOrKey: "your-secret-key", // Используйте тот же ключ, что и в JwtModule
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user; // Пользователь будет доступен в `req.user`
  }
}
