import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoComponente } from '../../entities/movimiento_componente.entity';

@Injectable()
export class MovimientoComponenteService {
  constructor(
    @InjectRepository(MovimientoComponente)
    private readonly movimientoComponenteRepository: Repository<MovimientoComponente>,
  ) {}

  async findAll(): Promise<MovimientoComponente[]> {
    return this.movimientoComponenteRepository.find({
      relations: ['componente', 'usuarioRegistra'],
    });
  }

  async findOne(id: number): Promise<MovimientoComponente | null> {
    return this.movimientoComponenteRepository.findOne({
      where: { movimiento_id: id },
      relations: ['componente', 'usuarioRegistra'],
    });
  }

  async create(
    movimientoComponente: MovimientoComponente,
  ): Promise<MovimientoComponente> {
    return this.movimientoComponenteRepository.save(movimientoComponente);
  }

  async update(
    id: number,
    movimientoComponente: MovimientoComponente,
  ): Promise<MovimientoComponente | null> {
    const existing = await this.movimientoComponenteRepository.findOne({
      where: { movimiento_id: id },
    });

    if (!existing) {
      return null; // O lanza una excepción si prefieres
    }

    Object.assign(existing, movimientoComponente);
    return this.movimientoComponenteRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.movimientoComponenteRepository.delete(id);
  }
}
