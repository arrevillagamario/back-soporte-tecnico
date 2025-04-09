import { Test, TestingModule } from '@nestjs/testing';
import { PrioridadTicketService } from './prioridad_ticket.service';

describe('PrioridadTicketService', () => {
  let service: PrioridadTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrioridadTicketService],
    }).compile();

    service = module.get<PrioridadTicketService>(PrioridadTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
