import { BadRequestException, Injectable } from "@nestjs/common";
import { Users } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) {}
  async findById(id: number): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(username: string, password: string): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new BadRequestException("User with this username already exists");
    }

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async getProfileFromToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: "your-secret-key",
      });

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
}
