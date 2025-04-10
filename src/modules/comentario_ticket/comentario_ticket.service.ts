import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComentarioTicket } from '../../entities/comentario_ticket.entity';

@Injectable()
export class ComentarioTicketService {
  constructor(
    @InjectRepository(ComentarioTicket)
    private readonly comentarioTicketRepository: Repository<ComentarioTicket>,
  ) {}

  async findAll(): Promise<ComentarioTicket[]> {
    return this.comentarioTicketRepository.find({
      relations: ['ticket', 'usuario'],
    });
  }

  async findOne(id: number): Promise<ComentarioTicket | null> {
    return this.comentarioTicketRepository.findOne({
      where: { comentario_id: id },
      relations: ['ticket', 'usuario'],
    });
  }

  async create(comentarioTicket: ComentarioTicket): Promise<ComentarioTicket> {
    return this.comentarioTicketRepository.save(comentarioTicket);
  }

  async update(
    id: number,
    comentarioTicket: ComentarioTicket,
  ): Promise<ComentarioTicket | null> {
    const existing = await this.comentarioTicketRepository.findOne({
      where: { comentario_id: id },
    });

    if (!existing) {
      return null; // O lanza una excepción si prefieres
    }

    Object.assign(existing, comentarioTicket);
    return this.comentarioTicketRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.comentarioTicketRepository.delete(id);
  }
}
