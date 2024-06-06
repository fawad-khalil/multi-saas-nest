import { NestFactory } from '@nestjs/core';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  // with CORS enabled
  const app = await NestFactory.create(AppModule, { cors: true });
  // Cross-Site Request Forgery
  app.use(csurf());
  // Basic vulnerabilities protection
  app.use(
    helmet({
      // Fix issue: https://docs.nestjs.com/security/helmet
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
