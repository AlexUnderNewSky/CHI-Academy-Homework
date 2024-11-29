import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Res,
  UnauthorizedException,
  BadRequestException,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
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

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!SESSION BLOCK, ONLY FOR TESTING!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  @ApiOperation({ summary: "SESSION!!!(only for testing) | Login via session" })
  @ApiResponse({ status: 200, description: "Session login successful" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  @Post("session-login")
  @UseGuards(AuthGuard("local"))
  sessionLogin(@Body() loginDto: LoginDto, @Req() req: Request) {
    return { message: "Session login successful", user: req.user };
  }

  @ApiOperation({ summary: "SESSION!!!(only for testing) | Logout session" })
  @ApiResponse({ status: 200, description: "Session logout successful" })
  @Post("session-logout")
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        throw new UnauthorizedException(err.message);
      }
      res.json({ message: "Logout successful" });
    });
  }

  @Get("session-info")
  @ApiOperation({ summary: "SESSION!!!(only for testing) | Get session info" })
  getSessionInfo(@Req() req: Request) {
    // Данные сессии будут храниться в req.session
    if (req.session) {
      return { sessionId: req.sessionID, sessionData: req.session };
    } else {
      return { message: "No session found" };
    }
  }
}
