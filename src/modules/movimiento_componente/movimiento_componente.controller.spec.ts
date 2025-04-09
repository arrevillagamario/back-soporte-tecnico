import { Test, TestingModule } from '@nestjs/testing';
import { MovimientoComponenteController } from './movimiento_componente.controller';

describe('MovimientoComponenteController', () => {
  let controller: MovimientoComponenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimientoComponenteController],
    }).compile();

    controller = module.get<MovimientoComponenteController>(MovimientoComponenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
