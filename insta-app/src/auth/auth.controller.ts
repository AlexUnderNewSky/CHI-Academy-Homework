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

@ApiTags("auth | Authentication")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login" })
  @ApiResponse({
    status: 200,
    description:
      "Successful login, access_token, user_name, user_role, user_id",
  })
  @ApiResponse({
    status: 401,
    description: "Incorrect username or password",
  })
  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() res) {

    if (!loginDto.username || !loginDto.password) {
      throw new BadRequestException("Incorrect username or password");
    }

    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );

    if (!user) {
        throw new UnauthorizedException("Incorrect username or password");
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
