import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service.js';
import { LessonsController } from './lessons.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [PrismaModule],
})
export class LessonsModule {}
