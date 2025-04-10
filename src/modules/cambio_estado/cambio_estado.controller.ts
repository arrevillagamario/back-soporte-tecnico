import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CambioEstadoService } from './cambio_estado.service';
import { CambioEstado } from '../../entities/cambio_estado.entity';

@Controller('cambio-estado')
export class CambioEstadoController {
  constructor(private readonly cambioEstadoService: CambioEstadoService) {}

  @Get()
  async findAll(): Promise<CambioEstado[]> {
    return this.cambioEstadoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CambioEstado | null> {
    return this.cambioEstadoService.findOne(id);
  }

  @Post()
  async create(@Body() cambioEstado: CambioEstado): Promise<CambioEstado> {
    return this.cambioEstadoService.create(cambioEstado);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() cambioEstado: CambioEstado,
  ): Promise<CambioEstado | null> {
    return this.cambioEstadoService.update(id, cambioEstado);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.cambioEstadoService.remove(id);
  }
}
