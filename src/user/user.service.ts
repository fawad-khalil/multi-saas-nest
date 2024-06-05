import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BaseCrudService } from 'src/base-crud/base-crud.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleTypesEnum } from 'src/roles/roles.enum';
import { RolesService } from 'src/roles/roles.service';
import { Organization } from 'src/shared/prismagraphql/organization';
import {
  CreateManyUserArgs,
  CreateOneUserArgs,
  DeleteManyUserArgs,
  DeleteOneUserArgs,
  FindFirstUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateManyUserArgs,
  UpdateOneUserArgs,
  User,
} from 'src/shared/prismagraphql/user';

@Injectable()
export class UserService extends BaseCrudService<
  User,
  FindFirstUserArgs,
  FindUniqueUserArgs,
  FindManyUserArgs,
  CreateOneUserArgs,
  CreateManyUserArgs,
  UpdateOneUserArgs,
  UpdateManyUserArgs,
  DeleteOneUserArgs,
  DeleteManyUserArgs
> {
  constructor(
    prisma: PrismaService,
    private readonly rolesService: RolesService,
  ) {
    super(prisma);
  }

  async create(args: CreateOneUserArgs, org: Organization): Promise<User> {
    // Hash the password before saving
    const { data: userData } = args;
    const hashedPassword = await bcrypt.hash(args.data.password, 10);
    args.data.password = hashedPassword;

    let defaultRole = null;

    if (userData.roleId) {
      defaultRole = await this.rolesService.findUnique({
        where: { roleType: RoleTypesEnum.ORG_USER },
      });
    }

    return super.create(
      {
        data: {
          ...userData,
          password: hashedPassword,
          organization: { connect: { id: org.id } },
          role: { connect: { id: userData.roleId || defaultRole.id } }, // Connect the role based on roleType
        },
      },
      org,
    );
  }

  async update(args: UpdateOneUserArgs, org: Organization): Promise<User> {
    if (args.data.password) {
      // Hash the password before updating
      const hashedPassword = await bcrypt.hash(args.data.password, 10);
      args.data.password = hashedPassword;
    }
    return super.update(args, org);
  }
}
