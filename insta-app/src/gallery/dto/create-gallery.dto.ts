import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryItemDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}