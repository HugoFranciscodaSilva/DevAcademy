import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { CoursesController } from './courses.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports:[PrismaModule]
})
export class CoursesModule {}
