import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoTicket } from '../../entities/estado_ticket.entity';
import { EstadoTicketService } from './estado_ticket.service';
import { EstadoTicketController } from './estado_ticket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoTicket])],
  providers: [EstadoTicketService],
  controllers: [EstadoTicketController],
})
export class EstadoTicketModule {}
