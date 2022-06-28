import { Module } from '@nestjs/common';
import { DiplomaService } from './diploma.service';
import { DiplomaController } from './diploma.controller';

@Module({
  controllers: [DiplomaController],
  providers: [DiplomaService]
})
export class DiplomaModule {}
