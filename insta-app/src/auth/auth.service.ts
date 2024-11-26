import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Users } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    if (user && (await this.comparePasswords(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: Users) {
    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: "30d" });

    return {
      access_token: accessToken,
    };
  }

  private async comparePasswords(
    plainText: string,
    hashed: string
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  extractTokenFromRequest(req): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1]; // Извлекаем токен после "Bearer "
    }
    return null;
  }
}
