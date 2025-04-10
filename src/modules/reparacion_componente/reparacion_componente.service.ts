import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReparacionComponente } from '../../entities/reparacion_componente.entity';

@Injectable()
export class ReparacionComponenteService {
  constructor(
    @InjectRepository(ReparacionComponente)
    private readonly reparacionComponenteRepository: Repository<ReparacionComponente>,
  ) {}

  async findAll(): Promise<ReparacionComponente[]> {
    return this.reparacionComponenteRepository.find({
      relations: ['reparacion', 'componente', 'ticket'],
    });
  }

  async findOne(id: number): Promise<ReparacionComponente | null> {
    return this.reparacionComponenteRepository.findOne({
      where: { reparacion_componente_id: id },
      relations: ['reparacion', 'componente', 'ticket'],
    });
  }

  async create(
    reparacionComponente: ReparacionComponente,
  ): Promise<ReparacionComponente> {
    return this.reparacionComponenteRepository.save(reparacionComponente);
  }

  async update(
    id: number,
    reparacionComponente: ReparacionComponente,
  ): Promise<ReparacionComponente | null> {
    const existing = await this.reparacionComponenteRepository.findOne({
      where: { reparacion_componente_id: id },
    });

    if (!existing) {
      return null; // O lanza una excepción si prefieres
    }

    Object.assign(existing, reparacionComponente);
    return this.reparacionComponenteRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.reparacionComponenteRepository.delete(id);
  }
}
