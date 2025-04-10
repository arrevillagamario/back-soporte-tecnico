import { IsEmail, IsString, MinLength, IsInt } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  nombre: string;

  @IsString()
  @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres.' })
  apellido: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;

  @IsInt({ message: 'El rol_id debe ser un número entero.' })
  rol_id: number; // ID del rol asociado al usuario
}
