import { Test, TestingModule } from '@nestjs/testing';
import { PrioridadTicketController } from './prioridad_ticket.controller';

describe('PrioridadTicketController', () => {
  let controller: PrioridadTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrioridadTicketController],
    }).compile();

    controller = module.get<PrioridadTicketController>(PrioridadTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
