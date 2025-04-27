import { Test, TestingModule } from '@nestjs/testing';
import { SecurityJwtService } from './security-jwt.service';

describe('SecurityJwtService', () => {
  let service: SecurityJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecurityJwtService],
    }).compile();

    service = module.get<SecurityJwtService>(SecurityJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
