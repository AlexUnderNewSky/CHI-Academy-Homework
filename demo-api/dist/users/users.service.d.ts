import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByUsername(username: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
    create(username: string, password: string): Promise<User>;
}
