import { Module } from '@nestjs/common';
import { EstadoTicketService } from './estado_ticket.service';
import { EstadoTicketController } from './estado_ticket.controller';

@Module({
  providers: [EstadoTicketService],
  controllers: [EstadoTicketController]
})
export class EstadoTicketModule {}
