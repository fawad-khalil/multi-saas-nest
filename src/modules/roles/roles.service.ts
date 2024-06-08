import { Injectable } from '@nestjs/common';
import { BaseCrudService } from 'src/base-crud/base-crud.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateManyRoleArgs,
  CreateOneRoleArgs,
  DeleteManyRoleArgs,
  DeleteOneRoleArgs,
  FindFirstRoleArgs,
  FindManyRoleArgs,
  FindUniqueRoleArgs,
  Role,
  UpdateManyRoleArgs,
  UpdateOneRoleArgs,
} from 'src/shared/prismagraphql/role';

@Injectable()
export class RolesService extends BaseCrudService<
  Role,
  FindFirstRoleArgs,
  FindUniqueRoleArgs,
  FindManyRoleArgs,
  CreateOneRoleArgs,
  CreateManyRoleArgs,
  UpdateOneRoleArgs,
  UpdateManyRoleArgs,
  DeleteOneRoleArgs,
  DeleteManyRoleArgs
> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  findUnique(args: FindUniqueRoleArgs): Promise<Role> {
    return this.prisma.role.findUnique(args);
  }
}
