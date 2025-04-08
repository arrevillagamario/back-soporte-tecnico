import { Test, TestingModule } from '@nestjs/testing';
import { ReparacionComponenteService } from './reparacion_componente.service';

describe('ReparacionComponenteService', () => {
  let service: ReparacionComponenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReparacionComponenteService],
    }).compile();

    service = module.get<ReparacionComponenteService>(ReparacionComponenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
