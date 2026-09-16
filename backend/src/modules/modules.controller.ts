import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service.js';
import { CreateModuleDto } from './dto/create-module.dto.js';
import { UpdateModuleDto } from './dto/update-module.dto.js';
import { Module } from '../generated/prisma/client.js';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  async createModule(@Body() data:CreateModuleDto):Promise<Module>{
    return await this.modulesService.createModule(data)
  }

  @Get()
  async getAllModules():Promise<Module[]>{
    return await this.modulesService.getAllModules()
  }

  @Get(':id')
  async getModuleById(@Param('id') id:string):Promise<Module>{
    return await this.modulesService.getModuleById(id)
  }

  @Patch(':id')
  async updateModule(@Param('id') id:string,@Body() data:UpdateModuleDto):Promise<Module>{
    return this.modulesService.updateModule(id,data)
  }

  @Delete(':id')
  async deleteModule(@Param('id') id:string):Promise<void>{
    this.modulesService.deleteModule(id)
  }
}
