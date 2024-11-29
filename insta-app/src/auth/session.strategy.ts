  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!SESSION BLOCK, ONLY FOR TESTING!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: "username",
      passwordField: "password",
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid username or password");
    }

    return { id: user.id, username: user.username };
  }
}
