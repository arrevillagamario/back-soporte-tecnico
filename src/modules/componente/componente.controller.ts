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
import { ComponenteService } from './componente.service';
import { Componente } from '../../entities/componente.entity';

@Controller('componente')
export class ComponenteController {
  constructor(private readonly componenteService: ComponenteService) {}

  @Post()
  async create(@Body() createComponenteDto: Partial<Componente>): Promise<Componente> {
    return await this.componenteService.create(createComponenteDto);
  }

  @Get()
  async findAll(): Promise<Componente[]> {
    return await this.componenteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Componente> {
    const componente = await this.componenteService.findOne(id);
    if (!componente) {
      throw new NotFoundException(`Componente con ID ${id} no encontrado`);
    }
    return componente;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateComponenteDto: Partial<Componente>,
  ): Promise<Componente> {
    return await this.componenteService.update(id, updateComponenteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.componenteService.remove(id);
  }
}
