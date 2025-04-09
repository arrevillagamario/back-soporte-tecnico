import { Module } from '@nestjs/common';
import { ReparacionComponenteService } from './reparacion_componente.service';
import { ReparacionComponenteController } from './reparacion_componente.controller';

@Module({
  providers: [ReparacionComponenteService],
  controllers: [ReparacionComponenteController]
})
export class ReparacionComponenteModule {}
