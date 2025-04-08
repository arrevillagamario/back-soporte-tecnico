import { Module } from '@nestjs/common';
import { CategoriaTicketService } from './categoria_ticket.service';
import { CategoriaTicketController } from './categoria_ticket.controller';

@Module({
  providers: [CategoriaTicketService],
  controllers: [CategoriaTicketController]
})
export class CategoriaTicketModule {}
