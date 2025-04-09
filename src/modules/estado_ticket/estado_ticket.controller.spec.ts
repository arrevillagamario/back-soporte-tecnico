import { Test, TestingModule } from '@nestjs/testing';
import { EstadoTicketController } from './estado_ticket.controller';

describe('EstadoTicketController', () => {
  let controller: EstadoTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoTicketController],
    }).compile();

    controller = module.get<EstadoTicketController>(EstadoTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
