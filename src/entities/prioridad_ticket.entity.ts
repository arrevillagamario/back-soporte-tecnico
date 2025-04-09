import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class PrioridadTicket {
  @PrimaryGeneratedColumn()
  prioridad_id: number;

  @Column({ length: 100 })
  prioridad: string;

  @OneToMany(() => Ticket, (ticket) => ticket.prioridad)
  tickets: Ticket[];
}
