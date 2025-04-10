import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('prioridad_ticket') // Especifica el nombre exacto de la tabla en la base de datos
export class PrioridadTicket {
  @PrimaryGeneratedColumn()
  prioridad_id: number; // Mapea a la columna `prioridad_id`

  @Column({ length: 100 })
  prioridad: string; // Mapea a la columna `prioridad`

  @OneToMany(() => Ticket, (ticket) => ticket.prioridad)
  tickets: Ticket[]; // Relación con la entidad `Ticket` (si aplica)
}
