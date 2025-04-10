import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from '../../entities/proveedor.entity';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  async create(@Body() createProveedorDto: Partial<Proveedor>): Promise<Proveedor> {
    return await this.proveedorService.create(createProveedorDto);
  }

  @Get()
  async findAll(): Promise<Proveedor[]> {
    return await this.proveedorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorService.findOne(id);
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    return proveedor;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProveedorDto: Partial<Proveedor>,
  ): Promise<Proveedor> {
    return await this.proveedorService.update(id, updateProveedorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.proveedorService.remove(id);
  }
}
