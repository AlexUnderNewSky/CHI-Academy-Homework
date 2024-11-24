import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

@Entity()
export class Users {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: "Unique user id",
  })
  id: number;

  @Expose()
  @Column({ unique: true })
  @ApiProperty({
    example: "user123",
    description: "User name",
  })
  username: string;

  @Column()
  @ApiProperty({
    example: "hashedPassword",
    description: "User password",
  })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;
    gallery: any;
}
