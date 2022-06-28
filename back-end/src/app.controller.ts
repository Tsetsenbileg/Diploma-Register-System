import { Controller, Get, UseGuards, Post, Request, Res, Body, BadRequestException, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from "./authentication/local-auth.guard"
import { AuthenticationService } from './authentication/authentication.service';
import { LoginDto } from './authentication/authentication.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from './shared/helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthenticationService) { }

  @Post('login')
  async login(@Body() logDto: LoginDto) {
    let user = await this.authService.validateUser(logDto);
    if (user) {
      return this.authService.login(user);
    }
    // return response.status(400).send("Invalid email or password");
    return { "statusCode": 401, "message": "Invalid Credentials" };
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: Helper.destinationPath,
      filename: Helper.customFileName
    })
  }))
  async uploadFile(@UploadedFile() files) {
    return files;
  }

  @Get('diploma-date')
  async diplomas() {
    return await this.appService.diplomasShuffle();
  }

  @Get("/diplo/:id")
  async diploma(@Param('id') id: number) {
    return await this.appService.diploma(+id);
  }

  @Post('search')
  async search(@Body() body: any) {
    return await this.appService.search(body.search);
  }
  @Get('sorted')
  async sorted() {
    return await this.appService.sorted();
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
