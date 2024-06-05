import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserCreateManyRoleInputEnvelope } from './user-create-many-role-input-envelope.input';
import { UserCreateOrConnectWithoutRoleInput } from './user-create-or-connect-without-role.input';
import { UserCreateWithoutRoleInput } from './user-create-without-role.input';
import { UserScalarWhereInput } from './user-scalar-where.input';
import { UserUpdateManyWithWhereWithoutRoleInput } from './user-update-many-with-where-without-role.input';
import { UserUpdateWithWhereUniqueWithoutRoleInput } from './user-update-with-where-unique-without-role.input';
import { UserUpsertWithWhereUniqueWithoutRoleInput } from './user-upsert-with-where-unique-without-role.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUncheckedUpdateManyWithoutRoleNestedInput {
  @Field(() => [UserCreateWithoutRoleInput], { nullable: true })
  @Type(() => UserCreateWithoutRoleInput)
  create?: Array<UserCreateWithoutRoleInput>;

  @Field(() => [UserCreateOrConnectWithoutRoleInput], { nullable: true })
  @Type(() => UserCreateOrConnectWithoutRoleInput)
  connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;

  @Field(() => [UserUpsertWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => UserUpsertWithWhereUniqueWithoutRoleInput)
  upsert?: Array<UserUpsertWithWhereUniqueWithoutRoleInput>;

  @Field(() => UserCreateManyRoleInputEnvelope, { nullable: true })
  @Type(() => UserCreateManyRoleInputEnvelope)
  createMany?: UserCreateManyRoleInputEnvelope;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;

  @Field(() => [UserWhereUniqueInput], { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;

  @Field(() => [UserUpdateWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => UserUpdateWithWhereUniqueWithoutRoleInput)
  update?: Array<UserUpdateWithWhereUniqueWithoutRoleInput>;

  @Field(() => [UserUpdateManyWithWhereWithoutRoleInput], { nullable: true })
  @Type(() => UserUpdateManyWithWhereWithoutRoleInput)
  updateMany?: Array<UserUpdateManyWithWhereWithoutRoleInput>;

  @Field(() => [UserScalarWhereInput], { nullable: true })
  @Type(() => UserScalarWhereInput)
  deleteMany?: Array<UserScalarWhereInput>;
}
