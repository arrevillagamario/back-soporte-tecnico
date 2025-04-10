import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReparacionComponenteService } from './reparacion_componente.service';
import { ReparacionComponente } from '../../entities/reparacion_componente.entity';

@Controller('reparacion-componente')
export class ReparacionComponenteController {
  constructor(
    private readonly reparacionComponenteService: ReparacionComponenteService,
  ) {}

  @Get()
  async findAll(): Promise<ReparacionComponente[]> {
    return this.reparacionComponenteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReparacionComponente | null> {
    return this.reparacionComponenteService.findOne(id);
  }

  @Post()
  async create(
    @Body() reparacionComponente: ReparacionComponente,
  ): Promise<ReparacionComponente> {
    return this.reparacionComponenteService.create(reparacionComponente);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() reparacionComponente: ReparacionComponente,
  ): Promise<ReparacionComponente | null> {
    return this.reparacionComponenteService.update(id, reparacionComponente);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.reparacionComponenteService.remove(id);
  }
}
