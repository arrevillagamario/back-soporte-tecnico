import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class TipoDispositivo {
  @PrimaryGeneratedColumn()
  dispositivo_id: number;

  @Column({ length: 100 })
  nombre: string;

  @OneToMany(() => Ticket, (ticket) => ticket.dispositivo)
  tickets: Ticket[];
}
