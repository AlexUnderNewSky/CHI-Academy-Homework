import { BadRequestException, Injectable } from "@nestjs/common";
import { Users } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
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
      throw new BadRequestException(
        "Пользователь с таким именем уже существует"
      );
    }

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
}
