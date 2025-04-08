import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class CategoriaTicket {
  @PrimaryGeneratedColumn()
  categoria_id: number;

  @Column({ length: 100 })
  categoria: string;

  @OneToMany(() => Ticket, (ticket) => ticket.categoria)
  tickets: Ticket[];
}
