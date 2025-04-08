import { Module } from '@nestjs/common';
import { ComentarioTicketService } from './comentario_ticket.service';
import { ComentarioTicketController } from './comentario_ticket.controller';

@Module({
  providers: [ComentarioTicketService],
  controllers: [ComentarioTicketController]
})
export class ComentarioTicketModule {}
