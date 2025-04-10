import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaTicket } from '../../entities/categoria_ticket.entity';
import { CategoriaTicketService } from './categoria_ticket.service';
import { CategoriaTicketController } from './categoria_ticket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaTicket])],
  providers: [CategoriaTicketService],
  controllers: [CategoriaTicketController],
})
export class CategoriaTicketModule {}
