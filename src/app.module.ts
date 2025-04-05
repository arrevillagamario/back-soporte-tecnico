import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProveedorModule } from './proveedor/proveedor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '12345', // Tu contraseña
      database: 'soporte_tecnico', // Nombre de tu base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Busca entidades
      synchronize: false, // ¡OJO! En producción debe ser 'false'
      options: {
        encrypt: false, // Si usas Azure, cambia a 'true'
        trustServerCertificate: true, // Para desarrollo sin certificado SSL
      },
    }),
    ProveedorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
