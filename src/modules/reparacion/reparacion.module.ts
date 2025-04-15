import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reparacion } from '../../entities/reparacion.entity';
import { Componente } from '../../entities/componente.entity'; // Importa la entidad Componente
import { ReparacionService } from './reparacion.service';
import { ReparacionController } from './reparacion.controller';
import { Usuario } from 'src/entities/usuario.entity';
import { Ticket } from 'src/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reparacion, Componente, Usuario, Ticket])], // Registra ambas entidades
  providers: [ReparacionService],
  controllers: [ReparacionController],
})
export class ReparacionModule {}
