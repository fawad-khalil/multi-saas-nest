import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { BaseCrudService } from 'src/base-crud/base-crud.service';
import { RoleTypesEnum } from 'src/modules/roles/roles.enum';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateManyOrganizationArgs,
  DeleteManyOrganizationArgs,
  DeleteOneOrganizationArgs,
  FindFirstOrganizationArgs,
  FindManyOrganizationArgs,
  FindUniqueOrganizationArgs,
  Organization,
  OrganizationCreateInput,
  UpdateManyOrganizationArgs,
  UpdateOneOrganizationArgs,
} from 'src/shared/prismagraphql/organization';
import { UserCreateInput } from 'src/shared/prismagraphql/user';

class CreateOneOrganizationData {
  @Field(() => OrganizationCreateInput, { nullable: false })
  @Type(() => OrganizationCreateInput)
  organization!: OrganizationCreateInput;

  @Field(() => UserCreateInput, { nullable: false })
  @Type(() => UserCreateInput)
  adminUser!: UserCreateInput;
}

@ArgsType()
export class CustomCreateOneOrganizationArgs {
  data!: CreateOneOrganizationData;
}

@Injectable()
export class OrganizationService extends BaseCrudService<
  Organization,
  FindFirstOrganizationArgs,
  FindUniqueOrganizationArgs,
  FindManyOrganizationArgs,
  CustomCreateOneOrganizationArgs,
  CreateManyOrganizationArgs,
  UpdateOneOrganizationArgs,
  UpdateManyOrganizationArgs,
  DeleteOneOrganizationArgs,
  DeleteManyOrganizationArgs
> {
  constructor(
    prisma: PrismaService,
    private readonly userService: UserService,
  ) {
    super(prisma);
  }

  async create(args: CustomCreateOneOrganizationArgs): Promise<Organization> {
    const { organization, adminUser } = args.data || {};
    try {
      const newOrg = await this.prisma.organization.create({
        data: organization,
      });

      await this.userService.create({
        data: {
          ...adminUser,
          roleType: RoleTypesEnum.ORG_ADMIN,
          organization: { connect: { id: newOrg.id } },
        },
      });

      return newOrg;
    } catch (error) {
      throw error;
    }
  }

  createMany(): Promise<Organization> {
    throw new MethodNotAllowedException();
  }
}
