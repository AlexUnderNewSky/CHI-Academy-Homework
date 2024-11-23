import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

@Entity()
export class Users {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор пользователя",
  })
  id: number;

  @Expose()
  @Column({ unique: true })
  @ApiProperty({
    example: "user123",
    description: "Уникальное имя пользователя",
  })
  username: string;

  @Column()
  @ApiProperty({
    example: "hashedPassword",
    description: "Пароль пользователя",
  })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;
}
