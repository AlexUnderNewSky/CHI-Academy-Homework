import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Отклоняет истёкшие токены
      secretOrKey: "your_secret_key", // Используйте тот же ключ, что и в JwtModule
    });
  }

  async validate(payload: any) {
    // В payload содержатся данные из токена
    return await this.usersService.findById(payload.sub);
  }
}
