import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { Reparacion } from './reparacion.entity';
import { Componente } from './componente.entity';

@Entity()
export class ReparacionComponente {
  @PrimaryGeneratedColumn()
  reparacion_componente_id: number;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => Reparacion, (reparacion) => reparacion.componentes)
  @JoinColumn({ name: 'reparacion_id' })
  reparacion: Reparacion;

  @ManyToOne(
    () => Componente,
    (componente) => componente.reparacionesComponentes,
  )
  @JoinColumn({ name: 'componente_id' })
  componente: Componente;

  @Column('int')
  cantidad_usada: number;
}
