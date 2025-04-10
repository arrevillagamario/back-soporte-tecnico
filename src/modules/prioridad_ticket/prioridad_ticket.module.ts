import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrioridadTicket } from '../../entities/prioridad_ticket.entity';
import { PrioridadTicketService } from './prioridad_ticket.service';
import { PrioridadTicketController } from './prioridad_ticket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PrioridadTicket])],
  providers: [PrioridadTicketService],
  controllers: [PrioridadTicketController],
})
export class PrioridadTicketModule {}
