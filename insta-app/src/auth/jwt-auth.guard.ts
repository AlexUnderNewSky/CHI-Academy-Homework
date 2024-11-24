import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      console.error("JWT token missing");
    }
    return super.canActivate(context);
  }
  handleRequest(err, user, info, context) {
    if (err || !user) {
      console.error("JWT error:", info?.message || "Unknown error");
      throw new UnauthorizedException("You are not authorized");
    }
    return user;
  }
}
