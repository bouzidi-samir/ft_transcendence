import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
	const api = await NestFactory.create(AppModule, {
		cors: true
	})

	api.listen(4000);
})();