import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaTicketController } from './categoria_ticket.controller';

describe('CategoriaTicketController', () => {
  let controller: CategoriaTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaTicketController],
    }).compile();

    controller = module.get<CategoriaTicketController>(CategoriaTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
