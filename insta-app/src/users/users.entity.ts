import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { GalleryItem } from "../gallery/gallery.entity";
import { Comment } from "../comments/comments.entity";

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

  @Exclude()
  @Column()
  @ApiProperty({
    example: "hashedPassword",
    description: "User password",
  })
  password: string;

  @Exclude()
  @Column({ default: false })
  @ApiProperty({
    example: false,
    description: "Indicates if the user has admin privileges",
  })
  isAdmin: boolean;

  @OneToMany(() => GalleryItem, (galleryItem) => galleryItem.user)
  gallery: GalleryItem[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
