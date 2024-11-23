import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class UsersService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
    findById(id: number): Promise<Users | undefined>;
    findByUsername(username: string): Promise<Users | undefined>;
    create(username: string, password: string): Promise<Users>;
    getProfileFromToken(token: string): Promise<Users>;
}
