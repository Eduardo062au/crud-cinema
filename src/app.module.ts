import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { SalasModule } from './salas/salas.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    CinemasModule,
    SalasModule,
    PedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
