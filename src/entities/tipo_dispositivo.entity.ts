import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('tipo_dispositivo') // Especifica el nombre exacto de la tabla en la base de datos
export class TipoDispositivo {
  @PrimaryGeneratedColumn()
  dispositivo_id: number; // Mapea a la columna `dispositivo_id`

  @Column({ length: 100 })
  nombre: string; // Mapea a la columna `nombre`

  @OneToMany(() => Ticket, (ticket) => ticket.dispositivo)
  tickets: Ticket[]; // Relación con la entidad `Ticket` (si aplica)
}
