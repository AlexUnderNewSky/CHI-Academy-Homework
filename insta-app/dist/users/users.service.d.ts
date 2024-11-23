import { Users } from "./users.entity";
import { Repository } from "typeorm";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    findById(id: number): Promise<Users | undefined>;
    findByUsername(username: string): Promise<Users | undefined>;
    create(username: string, password: string): Promise<Users>;
}
