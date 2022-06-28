import { Controller, Body, Request, Get, UseGuards, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CreateTeacherDto } from './teacher.dto';

@ApiTags('teacher')
@Controller('teacher')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post('create')
  async create(@Body() createTeacherDto: CreateTeacherDto, @Request() req: any) {
    return await this.teacherService.create(createTeacherDto, req)
  }

  @Get('get-all')
  async findAll(@Request() req: any) {
    return await this.teacherService.findAll(req);
  }

}
