import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class FeedbackService {

    constructor(private prisma: PrismaService) { }
    async create(createFeedback: any) {

        // console.log(createFeedback, "createFeedback");
        return await this.prisma.feedback.create({
            data: {
                text: createFeedback.text,
            }
        });
    }

    async findAll() {
        const f = await this.prisma.feedback.findMany();
        return { success: true, feedbacks: f }
    }

    async count() {
        return this.prisma.feedback.count();
    }
}
