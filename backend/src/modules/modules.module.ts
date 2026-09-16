import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service.js';
import { ModulesController } from './modules.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService],
  imports:[PrismaModule]
})
export class ModulesModule {}
