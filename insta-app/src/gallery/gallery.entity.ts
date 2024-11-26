import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "../users/users.entity";
import { Expose } from "class-transformer";

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
}
