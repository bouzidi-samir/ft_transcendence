import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
	const api = await NestFactory.create(AppModule, {
		cors: true
	})

	api.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	api.listen(4000);
})();