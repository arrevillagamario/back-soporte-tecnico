import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReparacionDto {
  @IsDateString()
  fecha_reparacion: string; // o Date, según te convenga

  @IsNumber()
  ticket_id: number;

  @IsNumber()
  usuario_tecnico_id: number;
}