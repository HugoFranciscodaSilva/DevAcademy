import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto.js';
import { UpdateLessonDto } from './dto/update-lesson.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Lesson } from '../generated/prisma/client.js';

@Injectable()
export class LessonsService {
  constructor(private prisma:PrismaService){}

  async createLesson(data:CreateLessonDto):Promise<Lesson>{
    return this.prisma.lesson.create({data})
  }

  async getAllLessons():Promise<Lesson[]>{
    return this.prisma.lesson.findMany({orderBy:{createAt:'asc'}})
  }

  async getLessonById(id:string):Promise<Lesson>{
    const found = await this.prisma.lesson.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado uma aula com o id ${id}`)
    return found
  }

  async updateLesson(id:string,data:UpdateLessonDto):Promise<Lesson>{
    const found = await this.prisma.lesson.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado uma aula com o id ${id}`)
    return this.prisma.lesson.update({
      where:{id},
      data
    })
  }

  async deleteLesson(id:string):Promise<void>{
    const found = await this.prisma.lesson.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado uma aula com o id ${id}`)
    await this.prisma.lesson.delete({where:{id}})
  }
}
