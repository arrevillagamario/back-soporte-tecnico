import { Controller, Get } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './entities/proveedor.entity';

@Controller('proveedores')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Get('test')
  async testConnection() {
    return this.proveedorService.testConnection();
  }

  @Get()
  async findAll(): Promise<Proveedor[]> {
    return this.proveedorService.findAll();
  }
}
