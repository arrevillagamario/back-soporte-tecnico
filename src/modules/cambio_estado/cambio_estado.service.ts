import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CambioEstado } from '../../entities/cambio_estado.entity';

@Injectable()
export class CambioEstadoService {
  constructor(
    @InjectRepository(CambioEstado)
    private readonly cambioEstadoRepository: Repository<CambioEstado>,
  ) {}

  async findAll(): Promise<CambioEstado[]> {
    return this.cambioEstadoRepository.find({
      relations: ['estadoAnterior', 'estadoNuevo', 'usuarioCambio', 'ticket'],
    });
  }

  async findOne(id: number): Promise<CambioEstado | null> {
    return this.cambioEstadoRepository.findOne({
      where: { cambio_estado_id: id },
      relations: ['estadoAnterior', 'estadoNuevo', 'usuarioCambio', 'ticket'],
    });
  }

  async create(cambioEstado: CambioEstado): Promise<CambioEstado> {
    console.log('Datos recibidos para crear:', cambioEstado);
    return this.cambioEstadoRepository.save(cambioEstado);
  }

  async update(
    id: number,
    cambioEstado: CambioEstado,
  ): Promise<CambioEstado | null> {
    const existing = await this.cambioEstadoRepository.findOne({
      where: { cambio_estado_id: id },
    });

    if (!existing) {
      return null; // O lanza una excepción si prefieres
    }

    Object.assign(existing, cambioEstado);
    return this.cambioEstadoRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.cambioEstadoRepository.delete(id);
  }
}
