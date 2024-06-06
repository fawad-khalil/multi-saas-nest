import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthResolver } from './auth/auth.resolver';
import { BaseCrudService } from './base-crud/base-crud.service';
import { OrganizationMiddleware } from './organization/organization.middleware';
import { OrganizationModule } from './organization/organization.module';
import { PermissionService } from './permission/permission.service';
import { PrismaService } from './prisma/prisma.service';
import { RolesService } from './roles/roles.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      typePaths: ['./**/*.graphql'],
      playground: process.env.ENV === 'dev',
      context: ({ req }) => ({ request: req }),
    }),
    SharedModule,
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
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
