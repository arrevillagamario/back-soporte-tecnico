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
import { CategoriaTicketService } from './categoria_ticket.service';
import { CategoriaTicket } from '../../entities/categoria_ticket.entity';

@Controller('categoria-ticket')
export class CategoriaTicketController {
  constructor(private readonly categoriaTicketService: CategoriaTicketService) {}

  @Post()
  async create(@Body() createCategoriaDto: Partial<CategoriaTicket>): Promise<CategoriaTicket> {
    return await this.categoriaTicketService.create(createCategoriaDto);
  }

  @Get()
  async findAll(): Promise<CategoriaTicket[]> {
    return await this.categoriaTicketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CategoriaTicket> {
    return await this.categoriaTicketService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: Partial<CategoriaTicket>,
  ): Promise<CategoriaTicket> {
    return await this.categoriaTicketService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.categoriaTicketService.remove(id);
  }
}
