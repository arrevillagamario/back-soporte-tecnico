import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Componente } from './componente.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class MovimientoComponente {
  @PrimaryGeneratedColumn()
  movimiento_id: number;

  @ManyToOne(() => Componente, (componente) => componente.movimientos)
  @JoinColumn({ name: 'componente_id' })
  componente: Componente;

  @Column({ length: 100 })
  tipo_movimiento: string;

  @Column({ type: 'datetime' })
  fecha_movimiento: Date;

  @Column('int')
  cantidad: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientosComponentes)
  @JoinColumn({ name: 'usuario_registra_id' })
  usuarioRegistra: Usuario;
}
