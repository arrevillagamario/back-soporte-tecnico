import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.contoroller';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])], // Registra la entidad
  providers: [ProveedorService],
  controllers: [ProveedorController],
})
export class ProveedorModule {}
