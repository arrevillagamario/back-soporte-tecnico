import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CambioEstado } from './cambio_estado.entity';

@Entity()
export class EstadoTicket {
  @PrimaryGeneratedColumn()
  estado_ticket_id: number;

  @Column({ length: 100 })
  estado: string;

  @OneToMany(() => Ticket, (ticket) => ticket.estadoActual)
  tickets: Ticket[];

  @OneToMany(() => CambioEstado, (cambio) => cambio.estadoAnterior)
  cambiosEstadoAnterior: CambioEstado[];

  @OneToMany(() => CambioEstado, (cambio) => cambio.estadoNuevo)
  cambiosEstadoNuevo: CambioEstado[];
}
