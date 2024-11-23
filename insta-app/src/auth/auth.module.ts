import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "30d" },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
