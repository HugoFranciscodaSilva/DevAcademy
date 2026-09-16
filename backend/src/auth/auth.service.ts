import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto.js';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService, private JwtService:JwtService){}

    async login(data:AuthDTO){
        const { email, password } = data
        const user = await this.prisma.user.findUnique({where:{email}})
        if(!user) throw new UnauthorizedException("Email ou senha incorretos!")
        
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch) throw new UnauthorizedException("Email ou senha incorretos!")
            
        const payload = {id:user.id,email,role:user.role}
        const token = this.JwtService.sign(payload)

        return {acess_token:token}
    }

}
