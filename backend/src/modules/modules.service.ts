import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto.js';
import { UpdateModuleDto } from './dto/update-module.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Module } from '../generated/prisma/client.js';

@Injectable()
export class ModulesService {
  constructor(private prisma:PrismaService){}

  async createModule(data:CreateModuleDto):Promise<Module>{
    return this.prisma.module.create({data})
  }

  async getAllModules():Promise<Module[]>{
    return this.prisma.module.findMany()
  }

  async getModuleById(id:string):Promise<Module>{
    const found = await this.prisma.module.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado um modulo com o id ${id}`)
    return found
  }

  async updateModule(id:string,data:UpdateModuleDto):Promise<Module>{
    const found = await this.prisma.module.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado um modulo com o id ${id}`)
    return this.prisma.module.update({
      where:{id},
      data
    })
  }

  async deleteModule(id:string):Promise<void>{
    const found = await this.prisma.module.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado um modulo com o id ${id}`)
    await this.prisma.module.delete({where:{id}})
  }
}
