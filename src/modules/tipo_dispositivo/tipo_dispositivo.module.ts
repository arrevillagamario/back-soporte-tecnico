import { Module } from '@nestjs/common';
import { TipoDispositivoService } from './tipo_dispositivo.service';
import { TipoDispositivoController } from './tipo_dispositivo.controller';

@Module({
  providers: [TipoDispositivoService],
  controllers: [TipoDispositivoController]
})
export class TipoDispositivoModule {}
