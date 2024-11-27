import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Users } from "../users/users.entity";
import { Expose } from "class-transformer";
import { Comment } from "../comments/comments.entity";

@Entity("galleryItems")
export class GalleryItem {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  imagePath: string;

  @Expose()
  @Column()
  description: string;

  @Expose() // Это поле будет включено в DTO
  @ManyToOne(() => Users, (user) => user.gallery, { eager: true })
  @JoinColumn({ name: "userId" })
  user: Users;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
