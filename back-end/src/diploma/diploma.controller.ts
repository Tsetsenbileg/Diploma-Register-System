import { Controller, Post, Get, Request, UseGuards, Body, Delete, Param } from '@nestjs/common';
import { DiplomaService } from './diploma.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CreateDiplomaDto } from './diploma.dto';

@ApiTags('diploma')
@Controller('diploma')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class DiplomaController {
  constructor(private readonly diplomaService: DiplomaService) { }

  @Post('create')
  async create(@Body() createDiploma: CreateDiplomaDto, @Request() req: any) {
    return await this.diplomaService.create(createDiploma, req)
  }


  @Get('count')
  async count(@Request() req: any) {
    return await this.diplomaService.count(req);
  }

  @Get('get-all')
  async findAll(@Request() req: any) {
    return await this.diplomaService.findAll(req);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.diplomaService.delete(id);
  }

}
