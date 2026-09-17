import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Enrollment } from '../generated/prisma/client.js';

export type CreateEnrollmentInput = CreateEnrollmentDto & {studentId:string}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma:PrismaService){}

  async createEnrollment(data:CreateEnrollmentInput):Promise<Enrollment>{
    return this.prisma.enrollment.create({data})
  }

  async getAllEnrollments():Promise<Enrollment[]>{
    return this.prisma.enrollment.findMany({orderBy:{createAt:'asc'}})
  }

  async getEnrollmentById(id:string):Promise<Enrollment>{
    const found = await this.prisma.enrollment.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado uma inscrição com o id ${id}`)
    return found
  }

  async updateEnrollment(id:string,data:UpdateEnrollmentDto):Promise<Enrollment>{
    const found = await this.prisma.enrollment.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado uma inscrição com o id ${id}`)
    return this.prisma.enrollment.update({
      where:{id},
      data
    })
  }

  async deleteEnrollment(id:string):Promise<void>{
    const found = await this.prisma.enrollment.findUnique({where:{id}})
    if(!found) throw new NotFoundException(`Não foi encontrado uma inscrição com o id ${id}`)
    await this.prisma.enrollment.delete({where:{id}})
  }
}
