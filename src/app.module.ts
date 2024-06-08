import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseCrudService } from './base-crud/base-crud.service';
import { OrganizationMiddleware } from './common/middlewares/organization/organization.middleware';
import { AuthResolver } from './modules/auth/auth.resolver';
import { OrganizationModule } from './modules/organization/organization.module';
import { PermissionService } from './modules/permission/permission.service';
import { RolesModule } from './modules/roles/roles.module';
import { RolesService } from './modules/roles/roles.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    // Basic Brute-Force Attack protection
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      typePaths: ['./**/*.graphql'],
      playground: process.env.ENV === 'dev',
      context: ({ req }) => ({ request: req }),
    }),
    SharedModule,
    RolesModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    BaseCrudService,
    AuthResolver,
    RolesService,
    PermissionService,
    RolesService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OrganizationMiddleware)
      .exclude()
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
