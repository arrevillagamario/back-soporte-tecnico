import { Test, TestingModule } from '@nestjs/testing';
import { ReparacionComponenteController } from './reparacion_componente.controller';

describe('ReparacionComponenteController', () => {
  let controller: ReparacionComponenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReparacionComponenteController],
    }).compile();

    controller = module.get<ReparacionComponenteController>(ReparacionComponenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
