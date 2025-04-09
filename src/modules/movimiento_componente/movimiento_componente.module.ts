import { Module } from '@nestjs/common';
import { MovimientoComponenteService } from './movimiento_componente.service';
import { MovimientoComponenteController } from './movimiento_componente.controller';

@Module({
  providers: [MovimientoComponenteService],
  controllers: [MovimientoComponenteController]
})
export class MovimientoComponenteModule {}
