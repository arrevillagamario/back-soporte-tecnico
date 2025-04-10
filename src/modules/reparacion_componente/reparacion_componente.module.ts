import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReparacionComponente } from '../../entities/reparacion_componente.entity';
import { ReparacionComponenteService } from './reparacion_componente.service';
import { ReparacionComponenteController } from './reparacion_componente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReparacionComponente])],
  providers: [ReparacionComponenteService],
  controllers: [ReparacionComponenteController],
})
export class ReparacionComponenteModule {}
