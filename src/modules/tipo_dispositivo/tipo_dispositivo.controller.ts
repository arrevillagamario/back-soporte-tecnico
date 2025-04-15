import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { TipoDispositivoService } from './tipo_dispositivo.service';
import { TipoDispositivo } from '../../entities/tipo_dispositivo.entity';

@Controller('tipo-dispositivo')
export class TipoDispositivoController {
  constructor(
    private readonly tipoDispositivoService: TipoDispositivoService,
  ) {}

  @Post()
  async create(
    @Body() tipoDispositivo: Partial<TipoDispositivo>,
  ): Promise<TipoDispositivo> {
    return this.tipoDispositivoService.create(tipoDispositivo);
  }

  @Get('total')
  async getTotalDevices(): Promise<{ total: number }> {
    const total = await this.tipoDispositivoService.getTotalDevices();
    return { total };
  }

  @Get('por-categoria')
  async getDevicesByCategory(): Promise<
    { categoria: string; total: number }[]
  > {
    return this.tipoDispositivoService.getDevicesByCategory();
  }

  @Get('en-reparacion')
  async getDevicesInRepair(): Promise<TipoDispositivo[]> {
    return this.tipoDispositivoService.getDevicesInRepair();
  }

  @Get('por-cliente/:clienteId')
  async getDevicesByClient(
    @Param('clienteId') clienteId: number,
  ): Promise<TipoDispositivo[]> {
    return this.tipoDispositivoService.getDevicesByClient(clienteId);
  }

  @Get()
  async findAll(): Promise<TipoDispositivo[]> {
    return this.tipoDispositivoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TipoDispositivo | null> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException(`El ID proporcionado no es válido: ${id}`);
    }
    return this.tipoDispositivoService.findOne(numericId);
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
