import { Field, InputType } from '@nestjs/graphql';
import { OrganizationCreateNestedOneWithoutUsersInput } from '../organization/organization-create-nested-one-without-users.input';
import { RoleTypes } from '../prisma/role-types.enum';
import { RoleCreateNestedOneWithoutUserInput } from '../role/role-create-nested-one-without-user.input';

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => RoleTypes, { nullable: true })
  roleType?: keyof typeof RoleTypes;

  @Field(() => Number, { nullable: false })
  roleId: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date | string;

  @Field(() => OrganizationCreateNestedOneWithoutUsersInput, {
    nullable: false,
  })
  organization!: OrganizationCreateNestedOneWithoutUsersInput;

  @Field(() => RoleCreateNestedOneWithoutUserInput, { nullable: false })
  role!: RoleCreateNestedOneWithoutUserInput;
}
