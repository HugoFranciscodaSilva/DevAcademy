import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { Course } from '../generated/prisma/client.js';
import { JwtAuthGuard } from '../auth/auth.guard.js';
import { currentUser } from '../auth/current-user.decorator.js';
import type { AuthenticatedUser } from '../auth/dto/auth.dto.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCourse(@currentUser() user:AuthenticatedUser, @Body() data:CreateCourseDto):Promise<Course>{
    return await this.coursesService.createCourse({...data,creatorId:user.id})
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCourses():Promise<Course[]>{
    return await this.coursesService.getAllCourses()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getCourseById(@Param('id') id:string):Promise<Course>{
    return await this.coursesService.getCourseById(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateCourse(@Param('id') id:string,@Body() data:UpdateCourseDto):Promise<Course>{
    return this.coursesService.updateCourse(id,data)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCourse(@Param('id') id:string):Promise<void>{
    this.coursesService.deleteCourse(id)
  }
}
