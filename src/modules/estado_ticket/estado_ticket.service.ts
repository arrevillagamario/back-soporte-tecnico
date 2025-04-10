import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoTicket } from '../../entities/estado_ticket.entity';

@Injectable()
export class EstadoTicketService {
  constructor(
    @InjectRepository(EstadoTicket)
    private readonly estadoTicketRepository: Repository<EstadoTicket>,
  ) {}

  async create(createEstadoTicketDto: Partial<EstadoTicket>): Promise<EstadoTicket> {
    const newEstadoTicket = this.estadoTicketRepository.create(createEstadoTicketDto);
    return await this.estadoTicketRepository.save(newEstadoTicket);
  }

  async findAll(): Promise<EstadoTicket[]> {
    return await this.estadoTicketRepository.find();
  }

  async findOne(id: number): Promise<EstadoTicket> {
    const estadoTicket = await this.estadoTicketRepository.findOne({ where: { estado_ticket_id: id } });
    if (!estadoTicket) {
      throw new NotFoundException(`Estado de ticket con ID ${id} no encontrado`);
    }
    return estadoTicket;
  }

  async update(id: number, updateEstadoTicketDto: Partial<EstadoTicket>): Promise<EstadoTicket> {
    await this.estadoTicketRepository.update(id, updateEstadoTicketDto);
    const updatedEstadoTicket = await this.findOne(id);
    if (!updatedEstadoTicket) {
      throw new NotFoundException(`Estado de ticket con ID ${id} no encontrado`);
    }
    return updatedEstadoTicket;
  }

  async remove(id: number): Promise<void> {
    const result = await this.estadoTicketRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estado de ticket con ID ${id} no encontrado`);
    }
  }
}
