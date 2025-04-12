import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Usuario } from './usuario.entity';

@Entity('tipo_dispositivo') // Especifica el nombre exacto de la tabla en la base de datos
export class TipoDispositivo {
  @PrimaryGeneratedColumn()
  dispositivo_id: number; // Mapea a la columna `dispositivo_id`

  @Column({ length: 100 })
  nombre: string; // Mapea a la columna `nombre`

  @Column({ length: 100 })
  tipo: string; // Nueva columna `tipo`

  @Column({ length: 100 })
  marca_modelo: string; // Nueva columna `marca_modelo`

  @OneToMany(() => Ticket, (ticket) => ticket.dispositivo)
  tickets: Ticket[];

  @ManyToOne(() => Usuario, (usuario) => usuario.dispositivosAsignados, { nullable: true })
  @JoinColumn({ name: 'usuario_asignado_id' })
  usuarioAsignado: Usuario;
}
