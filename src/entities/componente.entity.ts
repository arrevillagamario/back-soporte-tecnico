import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { ReparacionComponente } from './reparacion_componente.entity';
import { MovimientoComponente } from './movimiento_componente.entity';

@Entity('componentes') // Especifica el nombre exacto de la tabla en la base de datos
export class Componente {
  @PrimaryGeneratedColumn()
  componente_id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precio: number;

  @Column('int', { nullable: true })
  cantidad: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.componentes)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @OneToMany(
    () => ReparacionComponente,
    (reparacionComponente) => reparacionComponente.componente,
  )
  reparacionesComponentes: ReparacionComponente[];

  @OneToMany(() => MovimientoComponente, (movimiento) => movimiento.componente)
  movimientos: MovimientoComponente[];
}
