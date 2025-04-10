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
import { TipoDispositivoService } from './tipo_dispositivo.service';
import { TipoDispositivo } from '../../entities/tipo_dispositivo.entity';

@Controller('tipo-dispositivo')
export class TipoDispositivoController {
  constructor(private readonly tipoDispositivoService: TipoDispositivoService) {}

  @Post()
  async create(@Body() createTipoDispositivoDto: Partial<TipoDispositivo>): Promise<TipoDispositivo> {
    return await this.tipoDispositivoService.create(createTipoDispositivoDto);
  }

  @Get()
  async findAll(): Promise<TipoDispositivo[]> {
    return await this.tipoDispositivoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TipoDispositivo> {
    return await this.tipoDispositivoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTipoDispositivoDto: Partial<TipoDispositivo>,
  ): Promise<TipoDispositivo> {
    return await this.tipoDispositivoService.update(id, updateTipoDispositivoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.tipoDispositivoService.remove(id);
  }
}
