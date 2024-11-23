import { Module } from "@nestjs/common";
// import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/users.entity";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "Samael",
      password: "12zx12zx",
      database: "insta",
      entities: [Users],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
  ],
  // controllers: [AppController, AuthModule],
  // providers: [],
})
export class AppModule {}
