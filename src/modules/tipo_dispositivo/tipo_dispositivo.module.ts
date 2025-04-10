import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDispositivo } from '../../entities/tipo_dispositivo.entity';
import { TipoDispositivoService } from './tipo_dispositivo.service';
import { TipoDispositivoController } from './tipo_dispositivo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDispositivo])],
  providers: [TipoDispositivoService],
  controllers: [TipoDispositivoController],
})
export class TipoDispositivoModule {}
