import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../../entities/reparacion.entity';
import { Componente } from '../../entities/componente.entity';

@Injectable()
export class ReparacionService {
  constructor(
    @InjectRepository(Reparacion)
    private readonly reparacionRepository: Repository<Reparacion>,
    @InjectRepository(Componente)
    private readonly componenteRepository: Repository<Componente>, // Inyecta el repositorio de Componente
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
    // Verificar si hay suficientes componentes disponibles
    for (const reparacionComponente of reparacion.componentes) {
      const componente = await this.componenteRepository.findOne({
        where: { componente_id: reparacionComponente.componente.componente_id },
      });

      if (!componente) {
        throw new BadRequestException(
          `El componente con ID ${reparacionComponente.componente.componente_id} no existe.`,
        );
      }

      if ((componente.cantidad || 0) < reparacionComponente.cantidad_usada) {
        throw new BadRequestException(
          `No hay suficientes unidades del componente "${componente.nombre}". Disponible: ${componente.cantidad}, Requerido: ${reparacionComponente.cantidad_usada}.`,
        );
      }

      // Restar la cantidad usada del inventario
      componente.cantidad -= reparacionComponente.cantidad_usada;
      await this.componenteRepository.save(componente);
    }

    // Crear la reparación
    const nuevaReparacion = this.reparacionRepository.create(reparacion);
    return this.reparacionRepository.save(nuevaReparacion);
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
      const reparacionCost = reparacion.componentes.reduce(
        (subtotal, reparacionComponente) => {
          const costoComponente =
            (reparacionComponente.componente?.precio || 0) *
            (reparacionComponente.cantidad_usada || 0);
          return subtotal + costoComponente;
        },
        0,
      );
      return total + reparacionCost;
    }, 0);
  }

  async getRepairCost(reparacionId: number): Promise<number> {
    // Busca la reparación junto con sus componentes y la información del componente
    const reparacion = await this.reparacionRepository.findOne({
      where: { reparacion_id: reparacionId },
      relations: ['componentes', 'componentes.componente'],
    });
  
    // Si la reparación no existe, puedes decidir qué hacer:
    // lanzar excepción, retornar 0, etc. Aquí ejemplo lanzando excepción:
    if (!reparacion) {
      throw new BadRequestException(`La reparación con ID ${reparacionId} no existe.`);
    }
  
    // Calcula el costo total sumando (precio * cantidad_usada) de cada componente
    const totalCost = reparacion.componentes.reduce((acc, reparacionComponente) => {
      const precio = reparacionComponente.componente?.precio || 0;
      const cantidadUsada = reparacionComponente.cantidad_usada || 0;
      return acc + (precio * cantidadUsada);
    }, 0);
  
    return totalCost;
  }
  

  async getAverageRepairCost(): Promise<number> {
    const reparaciones = await this.reparacionRepository.find({
      relations: ['componentes', 'componentes.componente'],
    });

    if (reparaciones.length === 0) {
      return 0; // Si no hay reparaciones, el promedio es 0
    }

    const totalCost = reparaciones.reduce((total, reparacion) => {
      const reparacionCost = reparacion.componentes.reduce(
        (subtotal, reparacionComponente) => {
          const costoComponente =
            (reparacionComponente.componente?.precio || 0) *
            (reparacionComponente.cantidad_usada || 0);
          return subtotal + costoComponente;
        },
        0,
      );
      return total + reparacionCost;
    }, 0);

    return totalCost / reparaciones.length; // Calcula el promedio
  }

  async createAndUpdateInventory(reparacion: Reparacion): Promise<Reparacion> {
    // Verificar si hay suficientes componentes disponibles
    for (const reparacionComponente of reparacion.componentes) {
      const componente = await this.componenteRepository.findOne({
        where: { componente_id: reparacionComponente.componente.componente_id },
      });

      if (!componente) {
        throw new BadRequestException(
          `El componente con ID ${reparacionComponente.componente.componente_id} no existe.`,
        );
      }

      if ((componente.cantidad || 0) < reparacionComponente.cantidad_usada) {
        throw new BadRequestException(
          `No hay suficientes unidades del componente "${componente.nombre}". Disponible: ${componente.cantidad}, Requerido: ${reparacionComponente.cantidad_usada}.`,
        );
      }

      // Restar la cantidad usada del inventario
      componente.cantidad -= reparacionComponente.cantidad_usada;
      await this.componenteRepository.save(componente);
    }

    // Crear la reparación
    const nuevaReparacion = this.reparacionRepository.create(reparacion);
    return this.reparacionRepository.save(nuevaReparacion);
  }

  async count(): Promise<number> {
    return await this.reparacionRepository.count();
  }

  async countByMonth(): Promise<{ month: number; total: number }[]> {
    return await this.reparacionRepository
      .createQueryBuilder('reparacion')
      .select('MONTH(reparacion.fecha_reparacion)', 'month')
      .addSelect('COUNT(*)', 'total')
      .groupBy('MONTH(reparacion.fecha_reparacion)')
      .orderBy('month', 'ASC')
      .getRawMany();
  }

  async findByTecnico(tecnicoId: number): Promise<Reparacion[]> {
    return this.reparacionRepository.find({
      where: { tecnico: { usuario_id: tecnicoId } },
      relations: ['ticket', 'tecnico', 'componentes'],
    });
  }

  async countClosedRepairs(): Promise<number> {
    const result = await this.reparacionRepository
      .createQueryBuilder('reparacion')
      .leftJoin('reparacion.ticket', 'ticket') // Relación con la tabla ticket
      .leftJoin('ticket.estado_actual', 'estado_actual') // Relación con la tabla estado_ticket
      .where('estado_actual.estado = :estado', { estado: 'Cerrado' }) // Filtra por estado "Cerrado"
      .select('ticket.ticket_id') // Selecciona solo los tickets únicos
      .distinct(true) // Asegura que no se cuenten duplicados
      .getRawMany(); // Devuelve los datos

    return result.length; // Devuelve el número de tickets únicos
  }

  async calculateRepairCosts(): Promise<{ reparacionId: number; costo: number }[]> {
    const reparaciones = await this.reparacionRepository.find({
      relations: ['componentes', 'componentes.componente'],
    });

    return reparaciones.map((reparacion) => {
      const costo = reparacion.componentes.reduce((total, componenteUsado) => {
        return total + componenteUsado.componente.precio * componenteUsado.cantidad_usada;
      }, 0);

      return {
        reparacionId: reparacion.reparacion_id,
        costo,
      };
    });
  }
}
