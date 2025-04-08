import { Test, TestingModule } from '@nestjs/testing';
import { ComentarioTicketService } from './comentario_ticket.service';

describe('ComentarioTicketService', () => {
  let service: ComentarioTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentarioTicketService],
    }).compile();

    service = module.get<ComentarioTicketService>(ComentarioTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
