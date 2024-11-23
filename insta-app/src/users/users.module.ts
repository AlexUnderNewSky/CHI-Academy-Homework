import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: "your-secret-key", // Ваш секретный ключ для подписи JWT
      signOptions: { expiresIn: "30d" }, // Время действия токена
    }),
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
