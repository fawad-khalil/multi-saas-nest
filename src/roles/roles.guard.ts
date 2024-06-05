import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Operation } from '@prisma/client';
import * as pluralize from 'pluralize';
import { Observable } from 'rxjs';
import { User } from 'src/shared/prismagraphql/user';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    // get resolver name (modelName from permission table)
    const className = ctx.getClass().name.replace('Resolver', '');
    // get action name add,update,delete etc
    const handler = pluralize.singular(
      ctx.getHandler().name.replace(className, ''),
    ) as Operation;
    const user: User = req.user;
    // match the model name and action name from the permission
    // if user has permission only allow to access the query
    const allowedPermission = user.role?.permissions?.find(
      (permission) => permission.modelName === className,
    );
    if (!allowedPermission) {
      return false;
    }
    if (!allowedPermission.allowedOperations.includes(handler)) {
      return false;
    }
    return true;
  }
}
