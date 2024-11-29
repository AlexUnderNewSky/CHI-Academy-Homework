import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class SessionAuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
