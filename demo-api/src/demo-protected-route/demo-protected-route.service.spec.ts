import { Test, TestingModule } from '@nestjs/testing';
import { DemoProtectedRouteService } from './demo-protected-route.service';

describe('DemoProtectedRouteService', () => {
  let service: DemoProtectedRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoProtectedRouteService],
    }).compile();

    service = module.get<DemoProtectedRouteService>(DemoProtectedRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
