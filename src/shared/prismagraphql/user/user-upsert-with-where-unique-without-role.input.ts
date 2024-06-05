import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserCreateWithoutRoleInput } from './user-create-without-role.input';
import { UserUpdateWithoutRoleInput } from './user-update-without-role.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpsertWithWhereUniqueWithoutRoleInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserUpdateWithoutRoleInput, { nullable: false })
  @Type(() => UserUpdateWithoutRoleInput)
  update!: UserUpdateWithoutRoleInput;

  @Field(() => UserCreateWithoutRoleInput, { nullable: false })
  @Type(() => UserCreateWithoutRoleInput)
  create!: UserCreateWithoutRoleInput;
}
