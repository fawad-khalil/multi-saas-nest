import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutOrganizationInput } from './user-create-without-organization.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutOrganizationInput } from './user-create-or-connect-without-organization.input';
import { UserUpsertWithWhereUniqueWithoutOrganizationInput } from './user-upsert-with-where-unique-without-organization.input';
import { UserCreateManyOrganizationInputEnvelope } from './user-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithWhereUniqueWithoutOrganizationInput } from './user-update-with-where-unique-without-organization.input';
import { UserUpdateManyWithWhereWithoutOrganizationInput } from './user-update-many-with-where-without-organization.input';
import { UserScalarWhereInput } from './user-scalar-where.input';

@InputType()
export class UserUpdateManyWithoutOrganizationNestedInput {

    @Field(() => [UserCreateWithoutOrganizationInput], {nullable:true})
    @Type(() => UserCreateWithoutOrganizationInput)
    create?: Array<UserCreateWithoutOrganizationInput>;

    @Field(() => [UserCreateOrConnectWithoutOrganizationInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutOrganizationInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutOrganizationInput>;

    @Field(() => [UserUpsertWithWhereUniqueWithoutOrganizationInput], {nullable:true})
    @Type(() => UserUpsertWithWhereUniqueWithoutOrganizationInput)
    upsert?: Array<UserUpsertWithWhereUniqueWithoutOrganizationInput>;

    @Field(() => UserCreateManyOrganizationInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyOrganizationInputEnvelope)
    createMany?: UserCreateManyOrganizationInputEnvelope;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;

    @Field(() => [UserUpdateWithWhereUniqueWithoutOrganizationInput], {nullable:true})
    @Type(() => UserUpdateWithWhereUniqueWithoutOrganizationInput)
    update?: Array<UserUpdateWithWhereUniqueWithoutOrganizationInput>;

    @Field(() => [UserUpdateManyWithWhereWithoutOrganizationInput], {nullable:true})
    @Type(() => UserUpdateManyWithWhereWithoutOrganizationInput)
    updateMany?: Array<UserUpdateManyWithWhereWithoutOrganizationInput>;

    @Field(() => [UserScalarWhereInput], {nullable:true})
    @Type(() => UserScalarWhereInput)
    deleteMany?: Array<UserScalarWhereInput>;
}
