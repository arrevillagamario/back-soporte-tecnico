import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TipoDispositivoService } from './tipo_dispositivo.service';
import { TipoDispositivo } from '../../entities/tipo_dispositivo.entity';

@Controller('tipo-dispositivo')
export class TipoDispositivoController {
  constructor(private readonly tipoDispositivoService: TipoDispositivoService) {}

  @Post()
  async create(@Body() tipoDispositivo: Partial<TipoDispositivo>): Promise<TipoDispositivo> {
    return this.tipoDispositivoService.create(tipoDispositivo);
  }

  @Get()
  async findAll(): Promise<TipoDispositivo[]> {
    return this.tipoDispositivoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TipoDispositivo | null> {
    return this.tipoDispositivoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() tipoDispositivo: Partial<TipoDispositivo>,
  ): Promise<TipoDispositivo | null> {
    return this.tipoDispositivoService.update(id, tipoDispositivo);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tipoDispositivoService.remove(id);
  }
}
