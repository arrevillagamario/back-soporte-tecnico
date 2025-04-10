import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoComponente } from '../../entities/movimiento_componente.entity';
import { MovimientoComponenteService } from './movimiento_componente.service';
import { MovimientoComponenteController } from './movimiento_componente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoComponente])],
  providers: [MovimientoComponenteService],
  controllers: [MovimientoComponenteController],
})
export class MovimientoComponenteModule {}
