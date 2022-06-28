import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { DepartmentModule } from './department/department.module';
import { TeacherModule } from './teacher/teacher.module';
import { DiplomaModule } from './diploma/diploma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FeedbackModule } from './feedback/feedback.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [AuthenticationModule, UsersModule, DepartmentModule, TeacherModule, DiplomaModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
  }), FeedbackModule, MailerModule.forRoot({
    transport: {
      host: 'smtp.sendgrid.net',
      auth: {
        user: 'apikey',
        pass: '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',
      }
    }
  })],

  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
