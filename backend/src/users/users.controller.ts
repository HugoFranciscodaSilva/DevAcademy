import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from '../generated/prisma/client.js';
import { GetUserDTO } from './dto/get-user.dto.js';
import { JwtAuthGuard } from '../auth/auth.guard.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data:CreateUserDto):Promise<User>{
    return await this.usersService.createUser(data)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers():Promise<GetUserDTO[]>{
    return await this.usersService.getAllUsers()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id:string):Promise<GetUserDTO>{
    return await this.usersService.getUserById(id)
  }

  @Patch(':id')
  async updateUser(@Param('id') id:string,@Body() data:UpdateUserDto):Promise<User>{
    return this.usersService.updateUser(id,data)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id:string):Promise<void>{
    this.usersService.deleteUser(id)
  }
}
