import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from '../../entities/ticket.entity';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get('total')
  async countTotal(): Promise<number> {
    return this.ticketService.countTotal();
  }

  @Get('total-por-categoria')
  async countByCategory(): Promise<{ categoria: string; total: number }[]> {
    return this.ticketService.countByCategory();
  }

  @Get('total-por-estado')
  async countByState(): Promise<{ estado: string; total: number }[]> {
    return this.ticketService.countByState();
  }

  @Get('estado/:estadoId')
  async countByStateId(@Param('estadoId') estadoId: number): Promise<number> {
    return this.ticketService.countByStateId(estadoId);
  }

  @Get('conteo-estado')
  async countTicketsByStatus(): Promise<{
    activos: number;
    inactivos: number;
  }> {
    return this.ticketService.countTicketsByStatus();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Ticket | null> {
    return this.ticketService.findOne(id);
  }

  @Get('cliente/:id')
  async findTicketsByClient(@Param('id') id: number): Promise<Ticket[]> {
    return this.ticketService.findTicketsByClient(id);
  }

  @Get('tecnico/:id')
  async findTicketsByTechnician(@Param('id') id: number): Promise<Ticket[]> {
    return this.ticketService.findTicketsByTechnician(id);
  }

  @Post()
  async create(@Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketService.create(ticket);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() ticket: Ticket,
  ): Promise<Ticket | null> {
    return this.ticketService.update(id, ticket);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.ticketService.remove(id);
  }
}
