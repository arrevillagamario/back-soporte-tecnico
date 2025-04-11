import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Rol } from './rol.entity';
import { Ticket } from './ticket.entity';
import { Reparacion } from './reparacion.entity';
import { ComentarioTicket } from './comentario_ticket.entity';
import { CambioEstado } from './cambio_estado.entity';
import { MovimientoComponente } from './movimiento_componente.entity';
import { TipoDispositivo } from './tipo_dispositivo.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  usuario_id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100, select: false }) // select: false para no devolver la contraseña en consultas
  password: string;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @OneToMany(() => Ticket, (ticket) => ticket.tecnico)
  ticketsTecnico: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.cliente)
  ticketsCliente: Ticket[];

  @OneToMany(() => Reparacion, (reparacion) => reparacion.tecnico)
  reparaciones: Reparacion[];

  @OneToMany(() => ComentarioTicket, (comentario) => comentario.usuario)
  comentarios: ComentarioTicket[];

  @OneToMany(() => CambioEstado, (cambio) => cambio.usuarioCambio)
  cambiosEstado: CambioEstado[];

  @OneToMany(
    () => MovimientoComponente,
    (movimiento) => movimiento.usuarioRegistra,
  )
  movimientosComponentes: MovimientoComponente[];

  // Relación inversa con `TipoDispositivo`
  @OneToMany(() => TipoDispositivo, (dispositivo) => dispositivo.usuarioAsignado)
  dispositivosAsignados: TipoDispositivo[];
}
