import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { Users } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";

const MinLoginLength = 4;
const MinPasswordLength = 4;
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiQuery({ name: "id", required: false, description: "User ID" })
  @ApiQuery({ name: "username", required: false, description: "User name" })
  @ApiResponse({ status: 200, description: "Successfully get all users" })
  @ApiResponse({ status: 401, description: "User not authorized" })
  async getAllUsers(
    @Query("id") id?: number,
    @Query("username") username?: string
  ) {
    if (!id && !username) {
      throw new NotFoundException("ID or user must be provided");
    }
    const user = id
      ? await this.usersService.findById(id)
      : await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return plainToInstance(Users, user, { excludeExtraneousValues: true });
  }

  @ApiOperation({ summary: "Регистрация нового пользователя" })
  @ApiResponse({
    status: 201,
    description: "Пользователь успешно зарегистрирован",
  })
  @ApiResponse({ status: 400, description: "Некорректные данные" })
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.username ||
      !createUserDto.password ||
      createUserDto.username.length < MinLoginLength ||
      createUserDto.password.length < MinPasswordLength
    ) {
      throw new BadRequestException(
        `Длинна пароля и логина должна быть не меньше ${MinLoginLength} символов`
      );
    }

    const user = this.usersService.create(
      createUserDto.username,
      createUserDto.password
    );

    return plainToInstance(Users, user, { excludeExtraneousValues: true });
  }
}
