import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../../entities/rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  // Crear un nuevo rol
  async create(createRolDto: Partial<Rol>): Promise<Rol> {
    const newRol = this.rolRepository.create(createRolDto);
    return await this.rolRepository.save(newRol);
  }

  // Obtener todos los roles
  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find();
  }

  // Obtener un rol por ID
  async findOne(id: number): Promise<Rol | null> {
    return await this.rolRepository.findOne({ where: { rol_id: id } });
  }

  // Actualizar un rol por ID
  async update(id: number, updateRolDto: Partial<Rol>): Promise<Rol> {
    await this.rolRepository.update(id, updateRolDto);
    const updatedRol = await this.findOne(id);
    if (!updatedRol) {
      throw new NotFoundException(`Rol with ID ${id} not found`);
    }
    return updatedRol;
  }

  // Eliminar un rol por ID
  async remove(id: number): Promise<void> {
    await this.rolRepository.delete(id);
  }
}
