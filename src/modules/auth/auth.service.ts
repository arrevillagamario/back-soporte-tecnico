import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsuarioService } from '../usuario/usuario.service'; // Cambia a UsuarioService
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService, // Cambia a UsuarioService
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, nombre, apellido, rol_id } = registerDto;

    // Verifica si el usuario ya existe
    const existingUser = await this.usuarioService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El correo ya está registrado.');
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Busca el rol por ID
    const rol = await this.usuarioService.findRolById(rol_id);
    if (!rol) {
      throw new BadRequestException('El rol especificado no existe.');
    }

    // Crea el usuario
    const user = await this.usuarioService.create({
      email,
      password: hashedPassword,
      nombre,
      apellido,
      rol, // Asocia el rol al usuario
    });

    return { message: 'Usuario registrado exitosamente', user };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Busca al usuario por correo
    const user = await this.usuarioService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    // Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    // Genera el token JWT
    const payload = { sub: user.usuario_id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Devuelve el token, el usuario completo y el rol
    return {
      accessToken: token,
      user: {
        usuario_id: user.usuario_id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol, // Devuelve el objeto completo del rol
      },
    };
  }
}
