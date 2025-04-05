import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedorRepository: Repository<Proveedor>,
  ) {}

  async testConnection(): Promise<string> {
    try {
      await this.proveedorRepository.query('SELECT 1');
      return '✅ Conexión exitosa con la BD';
    } catch (error) {
      return `❌ Error: ${error.message}`;
    }
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find(); // Obtiene todos los proveedores
  }
}
