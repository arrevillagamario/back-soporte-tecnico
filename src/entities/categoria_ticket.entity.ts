import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('categoria_ticket') // Especifica el nombre exacto de la tabla en la base de datos
export class CategoriaTicket {
  @PrimaryGeneratedColumn()
  categoria_id: number; // Mapea a la columna `categoria_id`

  @Column({ length: 100 })
  categoria: string; // Mapea a la columna `categoria`

  @OneToMany(() => Ticket, (ticket) => ticket.categoria)
  tickets: Ticket[]; // Relación con la entidad `Ticket` (si aplica)
}
