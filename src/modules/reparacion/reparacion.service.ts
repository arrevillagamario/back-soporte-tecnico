import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../../entities/reparacion.entity';

@Injectable()
export class ReparacionService {
  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
  ) {}

  async findAll(): Promise<Reparacion[]> {
    return this.reparacionRepository.find({
      relations: ['ticket', 'tecnico', 'componentes'],
    });
  }

  async findOne(id: number): Promise<Reparacion | null> {
    return this.reparacionRepository.findOne({
      where: { reparacion_id: id },
      relations: ['ticket', 'tecnico', 'componentes'],
    });
  }

  async create(reparacion: Reparacion): Promise<Reparacion> {
    return this.reparacionRepository.save(reparacion);
  }

  async update(id: number, reparacion: Reparacion): Promise<Reparacion | null> {
    // Cargar la reparación existente
    const existingReparacion = await this.reparacionRepository.findOne({
      where: { reparacion_id: id },
      relations: ['ticket', 'tecnico', 'componentes'],
    });

    if (!existingReparacion) {
      return null; // O lanza una excepción si prefieres
    }

    // Actualizar los campos de la reparación
    Object.assign(existingReparacion, reparacion);

    // Guardar los cambios
    return this.reparacionRepository.save(existingReparacion);
  }

  async remove(id: number): Promise<void> {
    await this.reparacionRepository.delete(id);
  }

  async getTotalRepairCost(): Promise<number> {
    const reparaciones = await this.reparacionRepository.find({
      relations: ['componentes', 'componentes.componente'],
    });

    return reparaciones.reduce((total, reparacion) => {
      const reparacionCost = reparacion.componentes.reduce((subtotal, reparacionComponente) => {
        const costoComponente =
          (reparacionComponente.componente?.precio || 0) * (reparacionComponente.cantidad_usada || 0);
        return subtotal + costoComponente;
      }, 0);
      return total + reparacionCost;
    }, 0);
  }
}
