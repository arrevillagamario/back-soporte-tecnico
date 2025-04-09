import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CategoriaTicket } from './categoria_ticket.entity';
import { PrioridadTicket } from './prioridad_ticket.entity';
import { TipoDispositivo } from './tipo_dispositivo.entity';
import { Usuario } from './usuario.entity';
import { EstadoTicket } from './estado_ticket.entity';
import { Reparacion } from './reparacion.entity';
import { ComentarioTicket } from './comentario_ticket.entity';
import { CambioEstado } from './cambio_estado.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  ticket_id: number;

  @Column({ length: 200 })
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column({ length: 100, nullable: true })
  diagnostico: string;

  @Column({ length: 100, nullable: true })
  solucion: string;

  @Column({ type: 'datetime' })
  fecha_registro: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_solucion: Date;

  @ManyToOne(() => CategoriaTicket)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaTicket;

  @ManyToOne(() => PrioridadTicket)
  @JoinColumn({ name: 'prioridad_id' })
  prioridad: PrioridadTicket;

  @ManyToOne(() => TipoDispositivo)
  @JoinColumn({ name: 'dispositivo_id' })
  dispositivo: TipoDispositivo;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_tecnico_id' })
  tecnico: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_cliente_id' })
  cliente: Usuario;

  @ManyToOne(() => EstadoTicket)
  @JoinColumn({ name: 'estado_actual_id' })
  estadoActual: EstadoTicket;

  @OneToMany(() => Reparacion, (reparacion) => reparacion.ticket)
  reparaciones: Reparacion[];

  @OneToMany(() => ComentarioTicket, (comentario) => comentario.ticket)
  comentarios: ComentarioTicket[];

  @OneToMany(() => CambioEstado, (cambio) => cambio.ticket)
  cambiosEstado: CambioEstado[];
}
