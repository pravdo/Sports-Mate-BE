import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Sports Mate')
    .setDescription('The tennis matches API description')
    .setVersion('1.0')
    .addTag('sports')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const corsOrigins = configService.get<string>('CORS_ORIGINS')?.split(',');

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    //  HTTP headers that the frontend is allowed to send to API
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept', // For specifying response formats
      'Origin', // For indicating request origin
      'Access-Control-Allow-Origin',
    ],
    // custom headers that the backend sends which the frontend is able to read
    exposedHeaders: ['Content-Range', 'X-Total-Count', 'X-Pagination-Pages'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
