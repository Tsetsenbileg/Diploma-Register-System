import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });


  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHook(app);

  const config = new DocumentBuilder().setTitle("API").setDescription("Diploma thesis registration").setVersion("1.0").addBearerAuth({
    // I was also testing it without prefix 'Bearer ' before the JWT  
    name: 'Authorization',
    bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
    scheme: 'Bearer',
    type: 'http', // I`ve attempted type: 'apiKey' too
    in: 'Header',
  },
    'access-token').build();
  const document = SwaggerModule.createDocument(app, config);
  console.log(
    join(__dirname, '..', 'public')
  )
  SwaggerModule.setup("api", app, document);

  await app.listen(7000);
}
bootstrap();
