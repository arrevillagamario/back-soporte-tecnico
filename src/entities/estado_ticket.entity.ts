import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('estado_ticket') // Especifica el nombre exacto de la tabla en la base de datos
export class EstadoTicket {
  @PrimaryGeneratedColumn()
  estado_ticket_id: number; // Mapea a la columna `estado_ticket_id`

  @Column({ length: 100 })
  estado: string; // Mapea a la columna `estado`

  @OneToMany(() => Ticket, (ticket) => ticket.estado)
  tickets: Ticket[]; // Relación con la entidad `Ticket`
}
