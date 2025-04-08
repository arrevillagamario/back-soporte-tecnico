import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  rol_id: number;

  @Column({ length: 100 })
  rol: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
