import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Componente } from '../../entities/componente.entity';
import { ComponenteService } from './componente.service';
import { ComponenteController } from './componente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Componente])],
  providers: [ComponenteService],
  controllers: [ComponenteController],
})
export class ComponenteModule {}
