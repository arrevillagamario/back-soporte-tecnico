import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaTicketService } from './categoria_ticket.service';

describe('CategoriaTicketService', () => {
  let service: CategoriaTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaTicketService],
    }).compile();

    service = module.get<CategoriaTicketService>(CategoriaTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
