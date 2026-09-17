import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service.js';
import { EnrollmentsController } from './enrollments.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  imports:[PrismaModule,AuthModule]
})
export class EnrollmentsModule {}
