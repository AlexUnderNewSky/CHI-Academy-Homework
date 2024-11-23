import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'username123', description: 'Имя пользователя' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  password: string;
}