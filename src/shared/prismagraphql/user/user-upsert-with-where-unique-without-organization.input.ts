import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserCreateWithoutOrganizationInput } from './user-create-without-organization.input';
import { UserUpdateWithoutOrganizationInput } from './user-update-without-organization.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpsertWithWhereUniqueWithoutOrganizationInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => UserUpdateWithoutOrganizationInput)
  update!: UserUpdateWithoutOrganizationInput;

  @Field(() => UserCreateWithoutOrganizationInput, { nullable: false })
  @Type(() => UserCreateWithoutOrganizationInput)
  create!: UserCreateWithoutOrganizationInput;
}
