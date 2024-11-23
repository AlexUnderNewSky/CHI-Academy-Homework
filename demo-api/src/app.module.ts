import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { DemoProtectedRouteModule } from './demo-protected-route/demo-protected-route.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "lesson13",
    password: "password",
    database: "lesson13",
    entities: [User],
    synchronize: false,
  }),
    AuthModule,
    UsersModule,
    DemoProtectedRouteModule
  ]
})
export class AppModule { }
