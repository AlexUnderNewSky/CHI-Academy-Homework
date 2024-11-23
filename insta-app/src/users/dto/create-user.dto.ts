import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "username123",
    description: "Username for registration",
  })
  @MinLength(4, { message: "Username must be at least 4 characters" })
  username: string;

  @ApiProperty({
    example: "password123",
    description: "Password for registration",
  })
  @MinLength(4, { message: "Password must be at least 4 characters" })
  password: string;
}
