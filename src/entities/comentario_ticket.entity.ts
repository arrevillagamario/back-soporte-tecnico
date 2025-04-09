import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class ComentarioTicket {
  @PrimaryGeneratedColumn()
  comentario_id: number;

  @Column('text')
  contenido: string;

  @Column({ type: 'datetime' })
  fecha_comentario: Date;

  @ManyToOne(() => Ticket, (ticket) => ticket.comentarios)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => Usuario, (usuario) => usuario.comentarios)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
