import { Module } from '@nestjs/common';
import { CambioEstadoService } from './cambio_estado.service';
import { CambioEstadoController } from './cambio_estado.controller';

@Module({
  providers: [CambioEstadoService],
  controllers: [CambioEstadoController]
})
export class CambioEstadoModule {}
