import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { Users } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AuthService } from "src/auth/auth.service";
import { GetUser } from "src/decorators/get-user.decorator";

const MinLoginLength = 4;
const MinPasswordLength = 4;
@ApiTags("users | Login/Register for User")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: "Register new user" })
  @ApiResponse({
    status: 201,
    description: "Successfully registered new user",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.username ||
      !createUserDto.password ||
      createUserDto.username.length < MinLoginLength ||
      createUserDto.password.length < MinPasswordLength
    ) {
      throw new BadRequestException(
        `Password and login length must be at least ${MinLoginLength} characters`
      );
    }

    const user = this.usersService.create(
      createUserDto.username,
      createUserDto.password
    );

    return plainToInstance(Users, user, { excludeExtraneousValues: true });
  }

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
      throw new BadRequestException("ID or user must be provided");
    }
    const user = id
      ? await this.usersService.findById(id)
      : await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return plainToInstance(Users, user, { excludeExtraneousValues: true });
  }

  @Get("my-profile")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Get info about current user" })
  @ApiResponse({
    status: 200,
    description: "User profile fetched successfully",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: Users) {
    return {
      id: user.id,
      username: user.username,
    };
  }
}
