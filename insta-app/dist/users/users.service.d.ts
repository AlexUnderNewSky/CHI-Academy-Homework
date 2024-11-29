import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class UsersService {
    private usersRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService, configService: ConfigService);
    findById(id: number): Promise<Users | undefined>;
    findByUsername(username: string): Promise<Users | undefined>;
    create(username: string, password: string): Promise<Users>;
    private hashPassword;
    getProfileFromToken(token: string): Promise<Users>;
    findBySession(userId: number): Promise<Users>;
}
