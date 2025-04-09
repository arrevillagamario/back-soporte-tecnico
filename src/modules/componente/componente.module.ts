import { Module } from '@nestjs/common';
import { ComponenteService } from './componente.service';
import { ComponenteController } from './componente.controller';

@Module({
  providers: [ComponenteService],
  controllers: [ComponenteController]
})
export class ComponenteModule {}
