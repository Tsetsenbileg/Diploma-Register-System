import { Controller, Post, Body, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post('create')
  async create(@Body() createFeedback: any) {
    return await this.feedbackService.create(createFeedback);
  }

  @Get('get-all')
  async findAll() {
    return await this.feedbackService.findAll();
  }

  @Get('count')
  async count() {
    return await this.feedbackService.count();
  }
} 
