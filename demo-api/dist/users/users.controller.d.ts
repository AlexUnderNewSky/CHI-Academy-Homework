import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(id?: number, username?: string): Promise<User>;
    register(createUserDto: CreateUserDto): Promise<User>;
}
