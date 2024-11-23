import { JwtService } from "@nestjs/jwt";
import { Users } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: Users): Promise<{
        access_token: string;
    }>;
    private comparePasswords;
    extractTokenFromRequest(req: any): string | null;
}
