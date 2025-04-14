import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../../entities/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('tecnicos')
  async obtenerTecnicos(): Promise<Usuario[]> {
    return this.usuarioService.obtenerTecnicos();
  }
}
