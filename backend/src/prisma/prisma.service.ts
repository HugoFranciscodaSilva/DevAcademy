import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { adapter } from '../lib/prisma.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
    constructor(){
        super({adapter})
    }

    onModuleDestroy() {
        this.$disconnect()
    }
}
