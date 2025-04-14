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
    return this.usuarioService.findByRol(2); // ID del rol "Técnico"
  }

  @Get('clientes')
  async obtenerClientes(): Promise<Usuario[]> {
    return this.usuarioService.findByRol(3); // ID del rol "Cliente"
  }

  @Get('administradores')
  async obtenerAdministradores(): Promise<Usuario[]> {
    return this.usuarioService.findByRol(1); // ID del rol "Administrador"
  }

  @Get('conteo/clientes')
  async countClientes(): Promise<{ total: number }> {
    const total = await this.usuarioService.countClientes();
    return { total };
  }

  @Get('conteo/tecnicos')
  async countTecnicos(): Promise<{ total: number }> {
    const total = await this.usuarioService.countTecnicos();
    return { total };
  }

  @Get('conteo/administradores')
  async countAdministradores(): Promise<{ total: number }> {
    const total = await this.usuarioService.countAdministradores();
    return { total };
  }
}
