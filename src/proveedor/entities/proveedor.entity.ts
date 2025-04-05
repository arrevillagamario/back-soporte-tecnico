import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('proveedor') // Nombre exacto de la tabla en tu BD
export class Proveedor {
  @PrimaryGeneratedColumn({ name: 'proveedor_id' }) // Mapea el nombre de la columna
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, nullable: true }) // "nullable: true" permite valores nulos
  contacto: string;

  @Column({ length: 100, nullable: true })
  direccion: string;
}
