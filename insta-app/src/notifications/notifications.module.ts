import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  providers: [NotificationsGateway],
  exports: [NotificationsGateway], // Экспортируем, чтобы другие модули могли использовать
})
export class NotificationsModule {}
