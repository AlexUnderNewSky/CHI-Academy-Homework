  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!SESSION BLOCK, ONLY FOR TESTING!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class SessionAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated && request.isAuthenticated();
  }
}
