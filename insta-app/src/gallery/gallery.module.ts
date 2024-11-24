import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryItem } from './gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GalleryItem]),
  ],
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}
