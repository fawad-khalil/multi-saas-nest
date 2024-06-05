import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserUpdateWithoutRoleInput } from './user-update-without-role.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateWithWhereUniqueWithoutRoleInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserUpdateWithoutRoleInput, { nullable: false })
  @Type(() => UserUpdateWithoutRoleInput)
  data!: UserUpdateWithoutRoleInput;
}
