import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoComponenteService } from './movimiento_componente.service';

describe('MovimientoComponenteService', () => {
  let service: MovimientoComponenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientoComponenteService],
    }).compile();

    service = module.get<MovimientoComponenteService>(MovimientoComponenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
