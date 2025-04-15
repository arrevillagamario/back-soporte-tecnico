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
  async create(
    createTipoDispositivoDto: Partial<TipoDispositivo>,
  ): Promise<TipoDispositivo> {
    const newTipoDispositivo = this.tipoDispositivoRepository.create(
      createTipoDispositivoDto,
    );
    return await this.tipoDispositivoRepository.save(newTipoDispositivo);
  }

  // Obtener todos los tipos de dispositivos
  async findAll(): Promise<TipoDispositivo[]> {
    return this.tipoDispositivoRepository.find({
      relations: ['usuarioAsignado', 'tickets'], // Incluye relaciones necesarias
    });
  }

  // Obtener un tipo de dispositivo por ID
  async findOne(id: number): Promise<TipoDispositivo | null> {
    return this.tipoDispositivoRepository.findOne({
      where: { dispositivo_id: id },
      relations: ['usuarioAsignado', 'tickets'],
    });
  }

  // Actualizar un tipo de dispositivo por ID
  async update(
    id: number,
    updateTipoDispositivoDto: Partial<TipoDispositivo>,
  ): Promise<TipoDispositivo> {
    await this.tipoDispositivoRepository.update(id, updateTipoDispositivoDto);
    const updatedTipoDispositivo = await this.findOne(id);
    if (!updatedTipoDispositivo) {
      throw new NotFoundException(
        `Tipo de dispositivo con ID ${id} no encontrado`,
      );
    }
    return updatedTipoDispositivo;
  }

  // Eliminar un tipo de dispositivo por ID
  async remove(id: number): Promise<void> {
    const result = await this.tipoDispositivoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Tipo de dispositivo con ID ${id} no encontrado`,
      );
    }
  }

  // Obtener dispositivos por categoría
  async getDevicesByCategory(): Promise<
    { categoria: string; total: number }[]
  > {
    return this.tipoDispositivoRepository
      .createQueryBuilder('tipo_dispositivo')
      .select('tipo_dispositivo.tipo', 'categoria') // Selecciona la columna `tipo` como `categoria`
      .addSelect('COUNT(*)', 'total') // Cuenta el número de dispositivos por categoría
      .groupBy('tipo_dispositivo.tipo') // Agrupa por la columna `tipo`
      .getRawMany(); // Devuelve los resultados en formato plano
  }

  // Obtener el total de dispositivos
  async getTotalDevices(): Promise<number> {
    const total = await this.tipoDispositivoRepository.count();
    console.log('Total dispositivos:', total); // Log para depuración
    return total;
  }

  // Obtener dispositivos en reparación
  async getDevicesInRepair(): Promise<TipoDispositivo[]> {
    return this.tipoDispositivoRepository
      .createQueryBuilder('tipoDispositivo')
      .leftJoinAndSelect('tipoDispositivo.tickets', 'tickets')
      .leftJoinAndSelect('tipoDispositivo.usuarioAsignado', 'usuarioAsignado')
      .leftJoinAndSelect('tickets.estado_actual', 'estado_actual') // Relación con la tabla estado_ticket
      .where('tickets.estado_actual_id = :estadoId', { estadoId: 1 }) // Ajusta el valor 1 al ID correspondiente a "en_reparacion"
      .getMany();
  }

  // Obtener dispositivos por cliente
  async getDevicesByClient(clienteId: number): Promise<TipoDispositivo[]> {
    return this.tipoDispositivoRepository.find({
      where: { usuarioAsignado: { usuario_id: clienteId } },
      relations: ['usuarioAsignado', 'tickets'], // Incluye relaciones necesarias
    });
  }
}
