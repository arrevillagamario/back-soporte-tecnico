import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Ticket } from '../../entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: [
        'categoria',
        'prioridad',
        'dispositivo',
        'tecnico',
        'cliente',
        'estado',
        'reparaciones',
        'comentarios',
        'cambiosEstado',
      ],
    });
  }

  async findOne(id: number): Promise<Ticket | null> {
    return this.ticketRepository.findOne({
      where: { ticket_id: id },
      relations: [
        'categoria',
        'prioridad',
        'dispositivo',
        'tecnico',
        'cliente',
        'estado',
        'reparaciones',
        'comentarios',
        'cambiosEstado',
      ],
    });
  }

  async create(ticket: Ticket): Promise<Ticket> {
    return this.ticketRepository.save(ticket);
  }

  async update(id: number, ticket: Ticket): Promise<Ticket | null> {
    const existing = await this.ticketRepository.findOne({
      where: { ticket_id: id },
    });

    if (!existing) {
      return null;
    }

    Object.assign(existing, ticket);
    return this.ticketRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }

  async countTotal(): Promise<number> {
    return this.ticketRepository.count();
  }

  async countByCategory(): Promise<{ categoria: string; total: number }[]> {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.categoria', 'categoria')
      .select('categoria.categoria', 'categoria')
      .addSelect('COUNT(ticket.ticket_id)', 'total')
      .groupBy('categoria.categoria')
      .getRawMany();
  }

  async countByState(): Promise<{ estado: string; total: number }[]> {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.estado', 'estado')
      .select('estado.estado', 'estado')
      .addSelect('COUNT(ticket.ticket_id)', 'total')
      .groupBy('estado.estado')
      .getRawMany();
  }

  async countByStateId(stateId: number): Promise<number> {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.estado_actual_id = :stateId', { stateId })
      .getCount();
  }

  // Obtener los tickets registrados en el mismo día
  async findTicketsToday(): Promise<Ticket[]> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return this.ticketRepository.find({
      where: {
        fecha_registro: Between(startOfDay, endOfDay),
      },
      order: {
        fecha_registro: 'DESC', // Ordena por fecha de registro en orden descendente
      },
      relations: [
        'categoria',
        'prioridad',
        'dispositivo',
        'tecnico',
        'cliente',
        'estado',
        'reparaciones',
        'comentarios',
        'cambiosEstado',
      ],
    });
  }

  async countOpenAndClosed(): Promise<{ abiertos: number; cerrados: number }> {
    const abiertos = await this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.estado_actual_id = :openState', { openState: 1 })
      .getCount();

    const cerrados = await this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.estado_actual_id = :closedState', { closedState: 5 })
      .getCount();

    return { abiertos, cerrados };
  }
}
