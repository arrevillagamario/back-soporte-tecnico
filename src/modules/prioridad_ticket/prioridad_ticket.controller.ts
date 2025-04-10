import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { PrioridadTicketService } from './prioridad_ticket.service';
import { PrioridadTicket } from '../../entities/prioridad_ticket.entity';

@Controller('prioridad-ticket')
export class PrioridadTicketController {
  constructor(private readonly prioridadTicketService: PrioridadTicketService) {}

  @Post()
  async create(@Body() createPrioridadDto: Partial<PrioridadTicket>): Promise<PrioridadTicket> {
    return await this.prioridadTicketService.create(createPrioridadDto);
  }

  @Get()
  async findAll(): Promise<PrioridadTicket[]> {
    return await this.prioridadTicketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PrioridadTicket> {
    return await this.prioridadTicketService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePrioridadDto: Partial<PrioridadTicket>,
  ): Promise<PrioridadTicket> {
    return await this.prioridadTicketService.update(id, updatePrioridadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.prioridadTicketService.remove(id);
  }
}
