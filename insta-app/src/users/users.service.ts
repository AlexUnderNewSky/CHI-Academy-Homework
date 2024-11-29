import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Users } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService // Добавьте ConfigService
  ) {}
  async findById(id: number): Promise<Users | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<Users | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(username: string, password: string): Promise<Users> {
    const hashedPassword = await this.hashPassword(password);

    const existingUser = await this.usersRepository.findOneBy({ username });
    if (existingUser) {
      throw new BadRequestException("User with this username already exists");
    }

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async getProfileFromToken(token: string) {
    try {
      const secret = this.configService.get<string>("JWT_SECRET"); // Получение секрета из ENV
      const decoded = this.jwtService.verify(token, { secret });

      const user = await this.findById(decoded.sub);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error decoding token or fetching user:", error.message);
      throw new Error("Invalid token or user not found");
    }
  }

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!SESSION BLOCK, ONLY FOR TESTING!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  async findBySession(userId: number): Promise<Users> {
    const user = await this.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user;
  }
}
