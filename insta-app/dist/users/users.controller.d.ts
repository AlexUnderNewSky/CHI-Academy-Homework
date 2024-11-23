import { UsersService } from "./users.service";
import { Users } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "src/auth/auth.service";
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<Users>;
    getAllUsers(id?: number, username?: string): Promise<Users>;
    getProfile(req: any): Promise<{
        id: number;
        username: string;
        isAdmin: boolean;
    }>;
}
