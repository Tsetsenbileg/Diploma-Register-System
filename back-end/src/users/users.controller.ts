import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterAuthDto } from 'src/authentication/authentication.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './users.dto';
@ApiTags('users')
@Controller('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req: any) {
    return this.usersService.changePassword(req.user.username, changePasswordDto);
  }

  @Get('admins')
  async getAdmins() {
    return this.usersService.findAll();
  }

  @Get('admin-count')
  async getAdminCount() {
    return this.usersService.count();
  }
}
