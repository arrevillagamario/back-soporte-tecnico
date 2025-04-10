import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EstadoTicketService } from './estado_ticket.service';
import { EstadoTicket } from '../../entities/estado_ticket.entity';

@Controller('estado-ticket')
export class EstadoTicketController {
  constructor(private readonly estadoTicketService: EstadoTicketService) {}

  @Post()
  async create(@Body() createEstadoTicketDto: Partial<EstadoTicket>): Promise<EstadoTicket> {
    return await this.estadoTicketService.create(createEstadoTicketDto);
  }

  @Get()
  async findAll(): Promise<EstadoTicket[]> {
    return await this.estadoTicketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EstadoTicket> {
    return await this.estadoTicketService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEstadoTicketDto: Partial<EstadoTicket>,
  ): Promise<EstadoTicket> {
    return await this.estadoTicketService.update(id, updateEstadoTicketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.estadoTicketService.remove(id);
  }
}
