import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleTypes } from '../prisma/role-types.enum';
import { OrganizationCreateNestedOneWithoutUsersInput } from '../organization/organization-create-nested-one-without-users.input';

@InputType()
export class UserCreateWithoutRoleInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => RoleTypes, {nullable:true})
    roleType?: keyof typeof RoleTypes;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => Date, {nullable:true})
    deletedAt?: Date | string;

    @Field(() => String, {nullable:true})
    updatedBy?: string;

    @Field(() => OrganizationCreateNestedOneWithoutUsersInput, {nullable:false})
    organization!: OrganizationCreateNestedOneWithoutUsersInput;
}
