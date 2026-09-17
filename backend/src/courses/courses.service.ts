import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Course } from '../generated/prisma/client.js';

@Injectable()
export class CoursesService {
  constructor(private prisma:PrismaService){}

  async createCourse(data:CreateCourseDto):Promise<Course>{
    return this.prisma.course.create({data})
  }

  async getAllCourses():Promise<Course[]>{
    return this.prisma.course.findMany({orderBy:{createAt:'asc'}})
  }

  async getCourseById(id:string):Promise<Course>{
    const found = await this.prisma.course.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado um curso com o id ${id}`)
    return found
  }

  async updateCourse(id:string,data:UpdateCourseDto):Promise<Course>{
    const found = await this.prisma.course.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado um curso com o id ${id}`)
    return this.prisma.course.update({
      where:{id},
      data
    })
  }

  async deleteCourse(id:string):Promise<void>{
    const found = await this.prisma.course.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado um curso com o id ${id}`)
    await this.prisma.course.delete({where:{id}})
  }
}
