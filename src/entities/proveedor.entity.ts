import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Componente } from './componente.entity';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  proveedor_id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, nullable: true })
  contacto: string;

  @Column({ length: 100, nullable: true })
  direccion: string;

  @OneToMany(() => Componente, (componente) => componente.proveedor)
  componentes: Componente[];
}
