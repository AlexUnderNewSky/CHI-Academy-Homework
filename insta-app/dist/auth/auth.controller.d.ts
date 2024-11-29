import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: any): Promise<any>;
    sessionLogin(loginDto: LoginDto, req: Request): {
        message: string;
        user: Express.User;
    };
    logout(req: Request, res: Response): void;
    getSessionInfo(req: Request): {
        sessionId: string;
        sessionData: import("express-session").Session & Partial<import("express-session").SessionData>;
        message?: undefined;
    } | {
        message: string;
        sessionId?: undefined;
        sessionData?: undefined;
    };
}
