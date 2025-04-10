import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from '../../entities/proveedor.entity';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])], // Importa el repositorio de Proveedor
  providers: [ProveedorService],
  controllers: [ProveedorController],
})
export class ProveedorModule {}
