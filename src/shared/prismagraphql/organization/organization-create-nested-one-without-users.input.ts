import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutUsersInput } from './organization-create-without-users.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutUsersInput } from './organization-create-or-connect-without-users.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutUsersInput {

    @Field(() => OrganizationCreateWithoutUsersInput, {nullable:true})
    @Type(() => OrganizationCreateWithoutUsersInput)
    create?: OrganizationCreateWithoutUsersInput;

    @Field(() => OrganizationCreateOrConnectWithoutUsersInput, {nullable:true})
    @Type(() => OrganizationCreateOrConnectWithoutUsersInput)
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput;

    @Field(() => OrganizationWhereUniqueInput, {nullable:true})
    @Type(() => OrganizationWhereUniqueInput)
    connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'name' | 'subdomain' | 'name'>;
}
