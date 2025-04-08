import { Test, TestingModule } from '@nestjs/testing';
import { TipoDispositivoController } from './tipo_dispositivo.controller';

describe('TipoDispositivoController', () => {
  let controller: TipoDispositivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDispositivoController],
    }).compile();

    controller = module.get<TipoDispositivoController>(TipoDispositivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
