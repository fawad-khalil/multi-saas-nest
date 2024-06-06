import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RoleTypes } from '../prisma/role-types.enum';
import { Organization } from '../organization/organization.model';
import { Role } from '../role/role.model';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false})
    organizationId!: string;

    @Field(() => Int, {nullable:false})
    userRoleId!: number;

    @Field(() => RoleTypes, {nullable:true})
    roleType!: keyof typeof RoleTypes | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Date, {nullable:true})
    deletedAt!: Date | null;

    @Field(() => String, {nullable:true})
    updatedBy!: string | null;

    @Field(() => Organization, {nullable:false})
    organization?: Organization;

    @Field(() => Role, {nullable:false})
    role?: Role;
}
