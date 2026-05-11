import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // // Swagger configuration
  // const config = new DocumentBuilder()
  //   .setTitle('HRMS API')
  //   .setDescription('Comprehensive API documentation for the HRMS project')
  //   .setVersion('1.0')
  //   .addBearerAuth(
  //     { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
  //     'access-token',
  //   ) // if you use JWT
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document, {
  //   swaggerOptions: {
  //     persistAuthorization: true,
  //   },
  // });

  // Bind to port from .env
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);

  // console.log(`📖 Swagger docs available at: http://localhost:${port}/api`);
}
bootstrap();
