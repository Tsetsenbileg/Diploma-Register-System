import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterAuthDto, SuperRegisterDto } from './authentication.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("authentication")
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post("/register")
  async create(@Body() registerAuthDto: RegisterAuthDto) {
    return await this.authenticationService.create(registerAuthDto);
  }
  @Post('/super-register')
  async super(@Body() superRegisterDto: SuperRegisterDto) {
    return await this.authenticationService.signUp(superRegisterDto);
  }
}
