import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MovimientoComponenteService } from './movimiento_componente.service';
import { MovimientoComponente } from '../../entities/movimiento_componente.entity';

@Controller('movimiento-componente')
export class MovimientoComponenteController {
  constructor(
    private readonly movimientoComponenteService: MovimientoComponenteService,
  ) {}

  @Get()
  async findAll(): Promise<MovimientoComponente[]> {
    return this.movimientoComponenteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MovimientoComponente | null> {
    return this.movimientoComponenteService.findOne(id);
  }

  @Post()
  async create(
    @Body() movimientoComponente: MovimientoComponente,
  ): Promise<MovimientoComponente> {
    return this.movimientoComponenteService.create(movimientoComponente);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() movimientoComponente: MovimientoComponente,
  ): Promise<MovimientoComponente | null> {
    return this.movimientoComponenteService.update(id, movimientoComponente);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.movimientoComponenteService.remove(id);
  }
}
