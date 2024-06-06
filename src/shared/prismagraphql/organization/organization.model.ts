import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { OrganizationCount } from './organization-count.output';

@ObjectType()
export class Organization {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false})
    subdomain!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Date, {nullable:true})
    deletedAt!: Date | null;

    @Field(() => String, {nullable:true})
    updatedBy!: string | null;

    @Field(() => [User], {nullable:true})
    users?: Array<User>;

    @Field(() => OrganizationCount, {nullable:false})
    _count?: OrganizationCount;
}
