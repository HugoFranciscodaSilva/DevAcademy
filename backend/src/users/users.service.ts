import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { User } from '../generated/prisma/client.js';
import { GetUserDTO } from './dto/get-user.dto.js';
import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService){}

  async createUser(data:CreateUserDto):Promise<User>{
    const { name, email, password, role} = data
    const passwordHashed = await bcrypt.hash(password,10)
    return this.prisma.user.create({
      data:{
        name,
        email,
        password:passwordHashed,
        role
      }
    })
  }

  async getAllUsers():Promise<GetUserDTO[]>{
    return this.prisma.user.findMany({
      select:{
        id:true,
        name:true,
        email:true,
        role:true
      },
      orderBy:{
        createAt:'asc'
      }
    })
  }

  async getUserById(id:string):Promise<GetUserDTO>{
    const found = await this.prisma.user.findUnique({
      where:{id},
      select:{
        id:true,
        name:true,
        email:true,
        role:true
      }
    })
    if(!found) throw new NotFoundException(`Não foi encontrado um usuario com o id ${id}`)
    return found
  }

  async updateUser(id:string,data:UpdateUserDto):Promise<User>{
    const { name, password,role} = data
    const passwordHashed = password ? await bcrypt.hash(password,10) : undefined
    const found = await this.prisma.user.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado um usuario com o id ${id}`)
    return this.prisma.user.update({
      where:{id},
      data:{name,password:passwordHashed,role}
    })
  }

  async deleteUser(id:string):Promise<void>{
    const found = await this.prisma.user.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado um usuario com o id ${id}`)
    await this.prisma.user.delete({where:{id}})
  }
}
