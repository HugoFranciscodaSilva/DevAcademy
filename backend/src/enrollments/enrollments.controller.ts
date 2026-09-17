import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto.js';
import { Enrollment } from '../generated/prisma/client.js';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  async createEnrollment(@Body() data:CreateEnrollmentDto):Promise<Enrollment>{
    return await this.enrollmentsService.createEnrollment(data)
  }

  @Get()
  async getAllEnrollments():Promise<Enrollment[]>{
    return await this.enrollmentsService.getAllEnrollments()
  }

  @Get(':id')
  async getEnrollmentById(@Param('id') id:string):Promise<Enrollment>{
    return await this.enrollmentsService.getEnrollmentById(id)
  }

  @Patch(':id')
  async updateEnrollment(@Param('id') id:string,@Body() data:UpdateEnrollmentDto):Promise<Enrollment>{
    return this.enrollmentsService.updateEnrollment(id,data)
  }

  @Delete(':id')
  async deleteEnrollment(@Param('id') id:string):Promise<void>{
    this.enrollmentsService.deleteEnrollment(id)
  }
}
