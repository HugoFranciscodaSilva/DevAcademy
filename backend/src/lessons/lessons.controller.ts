import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonsService } from './lessons.service.js';
import { CreateLessonDto } from './dto/create-lesson.dto.js';
import { UpdateLessonDto } from './dto/update-lesson.dto.js';
import { Lesson } from '../generated/prisma/client.js';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  async createLesson(@Body() data:CreateLessonDto):Promise<Lesson>{
    return await this.lessonsService.createLesson(data)
  }

  @Get()
  async getAllLessons():Promise<Lesson[]>{
    return await this.lessonsService.getAllLessons()
  }

  @Get(':id')
  async getLessonById(@Param('id') id:string):Promise<Lesson>{
    return await this.lessonsService.getLessonById(id)
  }

  @Patch(':id')
  async updateLesson(@Param('id') id:string,@Body() data:UpdateLessonDto):Promise<Lesson>{
    return this.lessonsService.updateLesson(id,data)
  }

  @Delete(':id')
  async deleteLesson(@Param('id') id:string):Promise<void>{
    this.lessonsService.deleteLesson(id)
  }
}
