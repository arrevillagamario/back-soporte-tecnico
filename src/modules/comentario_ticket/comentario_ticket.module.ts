import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentarioTicket } from '../../entities/comentario_ticket.entity';
import { ComentarioTicketService } from './comentario_ticket.service';
import { ComentarioTicketController } from './comentario_ticket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ComentarioTicket])],
  providers: [ComentarioTicketService],
  controllers: [ComentarioTicketController],
})
export class ComentarioTicketModule {}
