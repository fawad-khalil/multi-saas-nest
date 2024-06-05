import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Organization } from '../organization/organization.model';
import { RoleTypes } from '../prisma/role-types.enum';
import { Role } from '../role/role.model';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  organizationId!: string;

  @Field(() => Int, { nullable: false })
  userRoleId!: number;

  @Field(() => RoleTypes, { nullable: true })
  roleType!: keyof typeof RoleTypes | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Date, { nullable: true })
  deletedAt!: Date | null;

  @Field(() => Organization, { nullable: false })
  organization?: Organization;

  @Field(() => Role, { nullable: false })
  role?: Role;
}
