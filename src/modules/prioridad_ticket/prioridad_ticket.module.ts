import { Module } from '@nestjs/common';
import { PrioridadTicketService } from './prioridad_ticket.service';
import { PrioridadTicketController } from './prioridad_ticket.controller';

@Module({
  providers: [PrioridadTicketService],
  controllers: [PrioridadTicketController]
})
export class PrioridadTicketModule {}
