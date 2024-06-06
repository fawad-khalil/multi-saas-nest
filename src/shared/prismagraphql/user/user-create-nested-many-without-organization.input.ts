import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutOrganizationInput } from './user-create-without-organization.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutOrganizationInput } from './user-create-or-connect-without-organization.input';
import { UserCreateManyOrganizationInputEnvelope } from './user-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedManyWithoutOrganizationInput {

    @Field(() => [UserCreateWithoutOrganizationInput], {nullable:true})
    @Type(() => UserCreateWithoutOrganizationInput)
    create?: Array<UserCreateWithoutOrganizationInput>;

    @Field(() => [UserCreateOrConnectWithoutOrganizationInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutOrganizationInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutOrganizationInput>;

    @Field(() => UserCreateManyOrganizationInputEnvelope, {nullable:true})
    @Type(() => UserCreateManyOrganizationInputEnvelope)
    createMany?: UserCreateManyOrganizationInputEnvelope;

    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>>;
}
