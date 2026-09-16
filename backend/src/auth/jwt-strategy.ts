import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import 'dotenv/config'
import { PrismaService } from "../prisma/prisma.service.js";
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private prisma:PrismaService){
        const secret = process.env.SECRET_JWT
        if(!secret) throw new Error("Secret não fornecido!")
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:secret
        })
    }

    async validate(payload:{id:string,email:string,role:string}){
        const user = await this.prisma.user.findUnique({where:{email:payload.email}})
        if(!user) throw new UnauthorizedException("Acesso não autorizado!")

        return user
    }
}