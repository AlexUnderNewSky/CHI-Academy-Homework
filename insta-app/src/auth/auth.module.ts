import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UsersModule } from "src/users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GalleryModule } from "src/gallery/gallery.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    ConfigModule, // Подключаем ConfigModule
    GalleryModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Подключение для доступа к конфигурации
      inject: [ConfigService], // Внедрение ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"), // Берем secret из .env
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN"), // Берем expiresIn из .env или используем 30 дней по умолчанию
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
