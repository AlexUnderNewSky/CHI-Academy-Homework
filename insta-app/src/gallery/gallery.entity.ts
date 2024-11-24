import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { Expose } from 'class-transformer';

@Entity('galleryItems')
export class GalleryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagePath: string;

  @Column()
  description: string;

  @Expose()
  @ManyToOne(() => Users, (user) => user.gallery, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: Users;
}