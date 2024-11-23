import { Module } from '@nestjs/common';
import { DemoProtectedRouteService } from './demo-protected-route.service';
import { DemoProtectedRouteController } from './demo-protected-route.controller';

@Module({
  providers: [DemoProtectedRouteService],
  controllers: [DemoProtectedRouteController]
})
export class DemoProtectedRouteModule {}
