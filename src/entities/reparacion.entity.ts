import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { Usuario } from './usuario.entity';
import { ReparacionComponente } from './reparacion_componente.entity';

@Entity()
export class Reparacion {
  @PrimaryGeneratedColumn()
  reparacion_id: number;

  @Column({ type: 'datetime' })
  fecha_reparacion: Date;

  @ManyToOne(() => Ticket, (ticket) => ticket.reparaciones)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => Usuario, (usuario) => usuario.reparaciones)
  @JoinColumn({ name: 'usuario_tecnico_id' })
  tecnico: Usuario;

  @OneToMany(
    () => ReparacionComponente,
    (reparacionComponente) => reparacionComponente.reparacion,
  )
  componentes: ReparacionComponente[];
}
