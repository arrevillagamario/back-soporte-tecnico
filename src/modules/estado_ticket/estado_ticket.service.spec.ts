import { Test, TestingModule } from '@nestjs/testing';
import { EstadoTicketService } from './estado_ticket.service';

describe('EstadoTicketService', () => {
  let service: EstadoTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoTicketService],
    }).compile();

    service = module.get<EstadoTicketService>(EstadoTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
