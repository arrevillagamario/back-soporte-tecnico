import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CambioEstado } from '../../entities/cambio_estado.entity';
import { CambioEstadoService } from './cambio_estado.service';
import { CambioEstadoController } from './cambio_estado.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CambioEstado])],
  providers: [CambioEstadoService],
  controllers: [CambioEstadoController],
})
export class CambioEstadoModule {}
