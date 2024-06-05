import { Field, InputType, Int } from '@nestjs/graphql';
import { RoleTypes } from '../prisma/role-types.enum';

@InputType()
export class UserCreateManyInput {
  @Field(() => String, { nullable: true })
  id?: string;

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
  roleType?: keyof typeof RoleTypes;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date | string;
}
