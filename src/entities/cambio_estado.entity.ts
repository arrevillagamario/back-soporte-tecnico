import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstadoTicket } from './estado_ticket.entity';
import { Usuario } from './usuario.entity';
import { Ticket } from './ticket.entity';

@Entity('cambio_estado')
export class CambioEstado {
  @PrimaryGeneratedColumn()
  cambio_estado_id: number;

  @ManyToOne(() => EstadoTicket)
  @JoinColumn({ name: 'estado_anterior_id' })
  estadoAnterior: EstadoTicket;

  @ManyToOne(() => EstadoTicket)
  @JoinColumn({ name: 'estado_nuevo_id' })
  estadoNuevo: EstadoTicket;

  @ManyToOne(() => Usuario, (usuario) => usuario.cambiosEstado)
  @JoinColumn({ name: 'usuario_cambio_id' })
  usuarioCambio: Usuario;

  @ManyToOne(() => Ticket, (ticket) => ticket.cambiosEstado)
  @JoinColumn({ name: 'id_ticket' })
  ticket: Ticket;
}
