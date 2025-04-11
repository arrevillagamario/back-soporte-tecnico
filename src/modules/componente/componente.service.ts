import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Componente } from '../../entities/componente.entity';

@Injectable()
export class ComponenteService {
  constructor(
    @InjectRepository(Componente)
    private readonly componenteRepository: Repository<Componente>,
  ) {}

  // Crear un nuevo componente
  async create(createComponenteDto: Partial<Componente>): Promise<Componente> {
    const newComponente = this.componenteRepository.create(createComponenteDto);
    return await this.componenteRepository.save(newComponente);
  }

  // Obtener todos los componentes
  async findAll(): Promise<Componente[]> {
    return await this.componenteRepository.find({ relations: ['proveedor'] });
  }

  // Obtener un componente por ID
  async findOne(id: number): Promise<Componente | null> {
    return await this.componenteRepository.findOne({
      where: { componente_id: id },
      relations: ['proveedor', 'reparacionesComponentes', 'movimientos'],
    });
  }

  // Actualizar un componente por ID
  async update(id: number, updateComponenteDto: Partial<Componente>): Promise<Componente> {
    await this.componenteRepository.update(id, updateComponenteDto);
    const updatedComponente = await this.findOne(id);
    if (!updatedComponente) {
      throw new NotFoundException(`Componente con ID ${id} no encontrado`);
    }
    return updatedComponente;
  }

  // Eliminar un componente por ID
  async remove(id: number): Promise<void> {
    const result = await this.componenteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Componente con ID ${id} no encontrado`);
    }
  }

  // Obtener el valor total del inventario
  async getTotalInventoryValue(): Promise<number> {
    const componentes = await this.componenteRepository.find();
    return componentes.reduce((total, componente) => {
      const componenteTotal = (componente.precio || 0) * (componente.cantidad || 0);
      return total + componenteTotal;
    }, 0);
  }
}
