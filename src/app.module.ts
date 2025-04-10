import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './modules/rol/rol.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProveedorModule } from './modules/proveedor/proveedor.module';
import { CambioEstadoModule } from './modules/cambio_estado/cambio_estado.module';
import { CategoriaTicketModule } from './modules/categoria_ticket/categoria_ticket.module';
import { PrioridadTicketModule } from './modules/prioridad_ticket/prioridad_ticket.module';
import { TipoDispositivoModule } from './modules/tipo_dispositivo/tipo_dispositivo.module';
import { ReparacionModule } from './modules/reparacion/reparacion.module';
import { EstadoTicketModule } from './modules/estado_ticket/estado_ticket.module';
import { ComentarioTicketModule } from './modules/comentario_ticket/comentario_ticket.module';
import { ComponenteModule } from './modules/componente/componente.module';
import { MovimientoComponenteModule } from './modules/movimiento_componente/movimiento_componente.module';
import { ReparacionComponenteModule } from './modules/reparacion_componente/reparacion_componente.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'LAPTOP-GHKFDTJ1', // Usar el nombre exacto del servidor como aparece en SQL Server Management Studio
      port: 1433,
      username: 'sa', // Usuario que aparece en tu imagen
      password: '1234', // La contraseña que usas en SSMS
      database: 'soporte_tecnico',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      options: {
        encrypt: false, // Opcional según tu configuración
        trustServerCertificate: true, // Coincide con tu configuración en SSMS
      },
      extra: {
        trustServerCertificate: true,
      },
    }),
    RolModule,
    TicketModule,
    UsuarioModule,
    ProveedorModule,
    CambioEstadoModule,
    CategoriaTicketModule,
    PrioridadTicketModule,
    TipoDispositivoModule,
    ReparacionModule,
    EstadoTicketModule,
    ComentarioTicketModule,
    ComponenteModule,
    MovimientoComponenteModule,
    ReparacionComponenteModule,
    // ...otros módulos
  ],
})
export class AppModule {}
