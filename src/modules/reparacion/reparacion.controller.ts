import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReparacionService } from './reparacion.service';
import { Reparacion } from '../../entities/reparacion.entity';

@Controller('reparacion')
export class ReparacionController {
  constructor(private readonly reparacionService: ReparacionService) {}

  @Get()
  async findAll(): Promise<Reparacion[]> {
    return this.reparacionService.findAll();
  }
  @Get('costo-total')
  async getTotalRepairCost(): Promise<{ total: number }> {
    const total = await this.reparacionService.getTotalRepairCost();
    return { total };
  }
  @Get('costo-promedio')
  async getAverageRepairCost(): Promise<{ promedio: number }> {
    const promedio = await this.reparacionService.getAverageRepairCost();
    return { promedio };
  }

  @Get(':id/costo')
  async getRepairCost(@Param('id') id: number): Promise<number> {
    return this.reparacionService.getRepairCost(id);
  }

  @Get('total')
  async count(): Promise<{ total: number }> {
    const total = await this.reparacionService.count();
    return { total };
  }

  @Get('total-por-mes')
  async countByMonth(): Promise<{ month: number; total: number }[]> {
    return await this.reparacionService.countByMonth();
  }

  @Get('total-cerradas')
  async countClosedRepairs(): Promise<{ total: number }> {
    const total = await this.reparacionService.countClosedRepairs();
    return { total };
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Reparacion | null> {
    return this.reparacionService.findOne(id);
  }

  @Get('tecnico/:tecnicoId')
  async findByTecnico(
    @Param('tecnicoId') tecnicoId: number,
  ): Promise<Reparacion[]> {
    return this.reparacionService.findByTecnico(tecnicoId);
  }

  @Post()
  async create(@Body() reparacion: Reparacion): Promise<Reparacion> {
    return this.reparacionService.create(reparacion);
  }

  @Post('realizar-reparacion')
  async createAndUpdateInventory(
    @Body() reparacion: Reparacion,
  ): Promise<Reparacion> {
    return this.reparacionService.createAndUpdateInventory(reparacion);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() reparacion: Reparacion,
  ): Promise<Reparacion | null> {
    return this.reparacionService.update(id, reparacion);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.reparacionService.remove(id);
  }
}
