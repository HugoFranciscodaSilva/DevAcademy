import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import 'dotenv/config'
import { JwtStrategy } from './jwt-strategy.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[
    PrismaModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:process.env.SECRET_JWT,
      signOptions:{expiresIn:'1h'}
    })
  ],
  exports:[PassportModule,JwtModule]
})
export class AuthModule {}
