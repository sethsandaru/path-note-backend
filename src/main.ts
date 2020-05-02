import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";

/**
 * Boot up the application
 * Booing booing booing
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // register validation
    app.useGlobalPipes(new ValidationPipe());

    // CORs Security
    app.enableCors({
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        origin: ['http://localhost:8080']
    })

    await app.listen(process.env.APPLICATION_PORT);

    // Some logger
    Logger.log("Your application has been started")
    Logger.log("https://localhost:" + process.env.APPLICATION_PORT)
}

bootstrap();
