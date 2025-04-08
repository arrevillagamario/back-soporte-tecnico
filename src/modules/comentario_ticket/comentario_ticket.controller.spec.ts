import { Test, TestingModule } from '@nestjs/testing';
import { ComentarioTicketController } from './comentario_ticket.controller';

describe('ComentarioTicketController', () => {
  let controller: ComentarioTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentarioTicketController],
    }).compile();

    controller = module.get<ComentarioTicketController>(ComentarioTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
