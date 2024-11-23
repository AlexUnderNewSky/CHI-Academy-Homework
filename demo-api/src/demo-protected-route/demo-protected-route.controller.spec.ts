import { Test, TestingModule } from '@nestjs/testing';
import { DemoProtectedRouteController } from './demo-protected-route.controller';

describe('DemoProtectedRouteController', () => {
  let controller: DemoProtectedRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoProtectedRouteController],
    }).compile();

    controller = module.get<DemoProtectedRouteController>(DemoProtectedRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
