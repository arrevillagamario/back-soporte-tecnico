import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ComentarioTicketService } from './comentario_ticket.service';
import { ComentarioTicket } from '../../entities/comentario_ticket.entity';

@Controller('comentario-ticket')
export class ComentarioTicketController {
  constructor(
    private readonly comentarioTicketService: ComentarioTicketService,
  ) {}

  @Get()
  async findAll(): Promise<ComentarioTicket[]> {
    return this.comentarioTicketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ComentarioTicket | null> {
    return this.comentarioTicketService.findOne(id);
  }

  @Post()
  async create(
    @Body() comentarioTicket: ComentarioTicket,
  ): Promise<ComentarioTicket> {
    return this.comentarioTicketService.create(comentarioTicket);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() comentarioTicket: ComentarioTicket,
  ): Promise<ComentarioTicket | null> {
    return this.comentarioTicketService.update(id, comentarioTicket);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.comentarioTicketService.remove(id);
  }
}
