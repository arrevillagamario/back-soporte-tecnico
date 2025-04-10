import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reparacion } from '../../entities/reparacion.entity';
import { ReparacionService } from './reparacion.service';
import { ReparacionController } from './reparacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reparacion])],
  providers: [ReparacionService],
  controllers: [ReparacionController],
})
export class ReparacionModule {}
