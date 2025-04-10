import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaTicket } from '../../entities/categoria_ticket.entity';

@Injectable()
export class CategoriaTicketService {
  constructor(
    @InjectRepository(CategoriaTicket)
    private readonly categoriaTicketRepository: Repository<CategoriaTicket>,
  ) {}

  // Crear una nueva categoría
  async create(createCategoriaDto: Partial<CategoriaTicket>): Promise<CategoriaTicket> {
    const newCategoria = this.categoriaTicketRepository.create(createCategoriaDto);
    return await this.categoriaTicketRepository.save(newCategoria);
  }

  // Obtener todas las categorías
  async findAll(): Promise<CategoriaTicket[]> {
    return await this.categoriaTicketRepository.find();
  }

  // Obtener una categoría por ID
  async findOne(id: number): Promise<CategoriaTicket> {
    const categoria = await this.categoriaTicketRepository.findOne({ where: { categoria_id: id } });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return categoria;
  }

  // Actualizar una categoría por ID
  async update(id: number, updateCategoriaDto: Partial<CategoriaTicket>): Promise<CategoriaTicket> {
    await this.categoriaTicketRepository.update(id, updateCategoriaDto);
    const updatedCategoria = await this.findOne(id);
    if (!updatedCategoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return updatedCategoria;
  }

  // Eliminar una categoría por ID
  async remove(id: number): Promise<void> {
    const result = await this.categoriaTicketRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
  }
}
