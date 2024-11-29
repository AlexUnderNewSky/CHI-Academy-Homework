import { UsersService } from "../users/users.service";
declare const SessionStrategy_base: new (...args: any[]) => any;
export declare class SessionStrategy extends SessionStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(username: string, password: string): Promise<any>;
}
export {};
