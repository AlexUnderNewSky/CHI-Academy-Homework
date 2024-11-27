import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { GalleryItem } from '../gallery/gallery.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique comment ID' })
  @Expose()
  id: number;

  @Column()
  @ApiProperty({ example: 'Nice post!', description: 'The content of the comment' })
  @Expose()
  content: string;

  @ManyToOne(() => Users, (user) => user.comments, { eager: true })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ description: 'The user who created the comment' })
  @Exclude() // Исключаем лишние данные о пользователе
  user: Users;

  @ManyToOne(() => GalleryItem, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  @ApiProperty({ description: 'The post associated with the comment' })
  @Expose()
  post: GalleryItem;
}
