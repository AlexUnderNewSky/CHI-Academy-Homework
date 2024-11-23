import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";

@ApiTags("auth")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Вход пользователя" })
  @ApiResponse({
    status: 200,
    description:
      "Успешная авторизация, возвращает JWT токен и имя пользователя",
  })
  @ApiResponse({
    status: 401,
    description: "Неверное имя пользователя или пароль",
  })
  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() res) {

    if (!loginDto.username || !loginDto.password) {
      throw new BadRequestException("Неверные учетные данные");
    }

    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );

    if (!user) {
        throw new UnauthorizedException("Неверное имя пользователя или пароль");
    }

    const { access_token } = await this.authService.login(user);

    const response = {
      access_token,
      userName: loginDto.username,
      userRole: user.role,
      userId: user.id,
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
