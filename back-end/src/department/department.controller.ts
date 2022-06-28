import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CreateDepartmentDto } from './department.dto';

@ApiTags('department')
@Controller('department')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }
  @Post('create')
  async create(@Body() createDepartment: CreateDepartmentDto, @Request() req: any) {
    return this.departmentService.create(req.user.id, req.user.username, +req.user.university, createDepartment);
  }

  @Get('get-all')
  async findAll(@Request() req: any) {
    return await this.departmentService.findAll(req.user.university);
  }
}
