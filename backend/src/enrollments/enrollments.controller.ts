import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto.js';
import { Enrollment } from '../generated/prisma/client.js';
import { currentUser } from '../auth/current-user.decorator.js';
import type { AuthenticatedUser } from '../auth/dto/auth.dto.js';
import { JwtAuthGuard } from '../auth/auth.guard.js';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createEnrollment(@currentUser() user:AuthenticatedUser, @Body() data:CreateEnrollmentDto):Promise<Enrollment>{
    return await this.enrollmentsService.createEnrollment({...data,studentId:user.id})
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllEnrollments():Promise<Enrollment[]>{
    return await this.enrollmentsService.getAllEnrollments()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getEnrollmentById(@Param('id') id:string):Promise<Enrollment>{
    return await this.enrollmentsService.getEnrollmentById(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateEnrollment(@Param('id') id:string,@Body() data:UpdateEnrollmentDto):Promise<Enrollment>{
    return this.enrollmentsService.updateEnrollment(id,data)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteEnrollment(@Param('id') id:string):Promise<void>{
    this.enrollmentsService.deleteEnrollment(id)
  }
}
