import { Field, InputType } from '@nestjs/graphql';
import { RoleTypes } from '../prisma/role-types.enum';
import { RoleCreateNestedOneWithoutUserInput } from '../role/role-create-nested-one-without-user.input';

@InputType()
export class UserCreateWithoutOrganizationInput {
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

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date | string;

  @Field(() => RoleCreateNestedOneWithoutUserInput, { nullable: false })
  role!: RoleCreateNestedOneWithoutUserInput;
}
