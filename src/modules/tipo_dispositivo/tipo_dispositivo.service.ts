import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDispositivo } from '../../entities/tipo_dispositivo.entity';

@Injectable()
export class TipoDispositivoService {
  constructor(
    @InjectRepository(TipoDispositivo)
    private readonly tipoDispositivoRepository: Repository<TipoDispositivo>,
  ) {}

  // Crear un nuevo tipo de dispositivo
  async create(createTipoDispositivoDto: Partial<TipoDispositivo>): Promise<TipoDispositivo> {
    const newTipoDispositivo = this.tipoDispositivoRepository.create(createTipoDispositivoDto);
    return await this.tipoDispositivoRepository.save(newTipoDispositivo);
  }

  // Obtener todos los tipos de dispositivos
  async findAll(): Promise<TipoDispositivo[]> {
    return await this.tipoDispositivoRepository.find({
      relations: ['usuarioAsignado', 'tickets'], // Incluye las relaciones necesarias
    });
  }

  // Obtener un tipo de dispositivo por ID
  async findOne(id: number): Promise<TipoDispositivo> {
    const tipoDispositivo = await this.tipoDispositivoRepository.findOne({
      where: { dispositivo_id: id },
      relations: ['usuarioAsignado', 'tickets'], // Incluye las relaciones necesarias
    });
    if (!tipoDispositivo) {
      throw new NotFoundException(`Tipo de dispositivo con ID ${id} no encontrado`);
    }
    return tipoDispositivo;
  }

  // Actualizar un tipo de dispositivo por ID
  async update(id: number, updateTipoDispositivoDto: Partial<TipoDispositivo>): Promise<TipoDispositivo> {
    await this.tipoDispositivoRepository.update(id, updateTipoDispositivoDto);
    const updatedTipoDispositivo = await this.findOne(id);
    if (!updatedTipoDispositivo) {
      throw new NotFoundException(`Tipo de dispositivo con ID ${id} no encontrado`);
    }
    return updatedTipoDispositivo;
  }

  // Eliminar un tipo de dispositivo por ID
  async remove(id: number): Promise<void> {
    const result = await this.tipoDispositivoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de dispositivo con ID ${id} no encontrado`);
    }
  }
}
