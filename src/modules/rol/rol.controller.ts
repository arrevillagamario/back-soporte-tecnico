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
import { RolService } from './rol.service';
import { Rol } from '../../entities/rol.entity';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  // Crear un nuevo rol
  @Post()
  async create(@Body() createRolDto: Partial<Rol>): Promise<Rol> {
    return await this.rolService.create(createRolDto);
  }

  // Obtener todos los roles
  @Get()
  async findAll(): Promise<Rol[]> {
    return await this.rolService.findAll();
  }

  // Obtener un rol por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Rol> {
    const rol = await this.rolService.findOne(id);
    if (!rol) {
      throw new NotFoundException(`Rol with ID ${id} not found`);
    }
    return rol;
  }

  // Actualizar un rol por ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRolDto: Partial<Rol>,
  ): Promise<Rol> {
    return await this.rolService.update(id, updateRolDto);
  }

  // Eliminar un rol por ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.rolService.remove(id);
  }
}
