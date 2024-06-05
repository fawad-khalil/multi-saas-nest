import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutUsersInput } from './organization-create-without-users.input';

@InputType()
export class OrganizationCreateOrConnectWithoutUsersInput {

    @Field(() => OrganizationWhereUniqueInput, {nullable:false})
    @Type(() => OrganizationWhereUniqueInput)
    where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'name' | 'subdomain' | 'name'>;

    @Field(() => OrganizationCreateWithoutUsersInput, {nullable:false})
    @Type(() => OrganizationCreateWithoutUsersInput)
    create!: OrganizationCreateWithoutUsersInput;
}
