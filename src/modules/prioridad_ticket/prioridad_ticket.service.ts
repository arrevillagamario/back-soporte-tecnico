import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrioridadTicket } from '../../entities/prioridad_ticket.entity';

@Injectable()
export class PrioridadTicketService {
  constructor(
    @InjectRepository(PrioridadTicket)
    private readonly prioridadTicketRepository: Repository<PrioridadTicket>,
  ) {}

  // Crear una nueva prioridad
  async create(createPrioridadDto: Partial<PrioridadTicket>): Promise<PrioridadTicket> {
    const newPrioridad = this.prioridadTicketRepository.create(createPrioridadDto);
    return await this.prioridadTicketRepository.save(newPrioridad);
  }

  // Obtener todas las prioridades
  async findAll(): Promise<PrioridadTicket[]> {
    return await this.prioridadTicketRepository.find();
  }

  // Obtener una prioridad por ID
  async findOne(id: number): Promise<PrioridadTicket> {
    const prioridad = await this.prioridadTicketRepository.findOne({ where: { prioridad_id: id } });
    if (!prioridad) {
      throw new NotFoundException(`Prioridad con ID ${id} no encontrada`);
    }
    return prioridad;
  }

  // Actualizar una prioridad por ID
  async update(id: number, updatePrioridadDto: Partial<PrioridadTicket>): Promise<PrioridadTicket> {
    await this.prioridadTicketRepository.update(id, updatePrioridadDto);
    const updatedPrioridad = await this.findOne(id);
    if (!updatedPrioridad) {
      throw new NotFoundException(`Prioridad con ID ${id} no encontrada`);
    }
    return updatedPrioridad;
  }

  // Eliminar una prioridad por ID
  async remove(id: number): Promise<void> {
    const result = await this.prioridadTicketRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Prioridad con ID ${id} no encontrada`);
    }
  }
}
