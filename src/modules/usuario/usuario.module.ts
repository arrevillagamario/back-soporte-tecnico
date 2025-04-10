import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // Importa la entidad Usuario
  providers: [UsuarioService], // Proporciona el servicio UsuarioService
  controllers: [UsuarioController],
  exports: [UsuarioService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class UsuarioModule {}
