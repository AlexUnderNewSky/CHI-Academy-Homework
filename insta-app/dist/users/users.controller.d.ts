import { UsersService } from "./users.service";
import { Users } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(id?: number, username?: string): Promise<Users>;
    register(createUserDto: CreateUserDto): Promise<Users>;
}
