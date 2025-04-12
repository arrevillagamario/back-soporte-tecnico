import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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
      order: {
        fecha_registro: 'DESC', // Ordena por fecha de registro en orden descendente
      },
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
      .select('estado.estado', 'estado') // Cambiado a 'estado.estado'
      .addSelect('COUNT(ticket.ticket_id)', 'total')
      .groupBy('estado.estado') // Cambiado a 'estado.estado'
      .getRawMany();
  }

  async countTicketsByStatus(): Promise<{ activos: number; inactivos: number }> {
    const activos = await this.ticketRepository.count({
      where: {
        estado_actual: {
          estado: In(['Abierto', 'En Progreso', 'En Espera', 'Resuelto']),
        },
      },
      relations: ['estado_actual'],
    });

    const inactivos = await this.ticketRepository.count({
      where: {
        estado_actual: {
          estado: 'Cerrado',
        },
      },
      relations: ['estado_actual'],
    });

    return { activos, inactivos };
  }

  async findTicketsByClient(usuarioId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        cliente: {
          usuario_id: usuarioId,
          rol: {
            rol: 'cliente', // Asegúrate de que el rol sea "cliente"
          },
        },
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
      ],
      order: {
        fecha_registro: 'DESC', // Ordena por fecha de registro en orden descendente
      },
    });
  }

  async findTicketsByTechnician(tecnicoId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        tecnico: {
          usuario_id: tecnicoId,
        },
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
      ],
      order: {
        fecha_registro: 'DESC', // Ordena por fecha de registro en orden descendente
      },
    });
  }
}
