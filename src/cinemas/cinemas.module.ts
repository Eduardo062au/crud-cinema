import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CinemasController],
  providers: [CinemasService],
})
export class CinemasModule {}
