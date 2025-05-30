import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Rol } from 'src/entities/rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, // Repositorio de TypeORM para la entidad Usuario
  ) {}

  // Busca un usuario por su correo electrónico
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { email },
      relations: ['rol'], // Incluye la relación con Rol si es necesario
      select: ['usuario_id', 'email', 'password', 'nombre', 'apellido'], // Incluye solo los campos necesarios
    });
  }

  // Crea un nuevo usuario
  async create(userData: Partial<Usuario>): Promise<Usuario> {
    const user = this.usuarioRepository.create(userData);
    return this.usuarioRepository.save(user);
  }

  async findRolById(rol_id: number): Promise<Rol | null> {
    return this.usuarioRepository.manager.findOne(Rol, { where: { rol_id } });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: ['rol'], // Incluye la relación con el rol
      select: ['usuario_id', 'nombre', 'apellido', 'email'], // Excluye el campo password
    });
  }

  async obtenerTecnicos(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { rol: { rol_id: 2 } },
      relations: ['rol'], // Incluye la relación con el rol
      select: ['usuario_id', 'nombre', 'apellido', 'email'], // Excluye el campo password
    });
  }
}
