import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from '../../entities/proveedor.entity';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  // Crear un nuevo proveedor
  async create(createProveedorDto: Partial<Proveedor>): Promise<Proveedor> {
    const newProveedor = this.proveedorRepository.create(createProveedorDto);
    return await this.proveedorRepository.save(newProveedor);
  }

  // Obtener todos los proveedores
  async findAll(): Promise<Proveedor[]> {
    return await this.proveedorRepository.find();
  }

  // Obtener un proveedor por ID
  async findOne(id: number): Promise<Proveedor | null> {
    return await this.proveedorRepository.findOne({
      where: { proveedor_id: id },
    });
  }

  // Obtener el total de proveedores
  async count(): Promise<number> {
    return await this.proveedorRepository.count();
  }

  // Actualizar un proveedor por ID
  async update(
    id: number,
    updateProveedorDto: Partial<Proveedor>,
  ): Promise<Proveedor> {
    await this.proveedorRepository.update(id, updateProveedorDto);
    const updatedProveedor = await this.findOne(id);
    if (!updatedProveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    return updatedProveedor;
  }

  // Eliminar un proveedor por ID
  async remove(id: number): Promise<void> {
    const result = await this.proveedorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
  }
}
