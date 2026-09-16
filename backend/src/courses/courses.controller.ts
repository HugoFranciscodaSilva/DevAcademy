import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { Course } from '../generated/prisma/client.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async createCourse(@Body() data:CreateCourseDto):Promise<Course>{
    return await this.coursesService.createCourse(data)
  }

  @Get()
  async getAllCourses():Promise<Course[]>{
    return await this.coursesService.getAllCourses()
  }

  @Get(':id')
  async getCourseById(@Param('id') id:string):Promise<Course>{
    return await this.coursesService.getCourseById(id)
  }

  @Patch(':id')
  async updateCourse(@Param('id') id:string,data:UpdateCourseDto):Promise<Course>{
    return this.coursesService.updateCourse(id,data)
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id:string):Promise<void>{
    this.coursesService.deleteCourse(id)
  }
}
