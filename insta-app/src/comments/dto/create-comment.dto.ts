import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Nice post!', description: 'Content of the comment' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 1, description: 'ID of the gallery post' })
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
