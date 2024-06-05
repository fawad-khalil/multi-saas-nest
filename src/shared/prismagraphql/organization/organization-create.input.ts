import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedManyWithoutOrganizationInput } from '../user/user-create-nested-many-without-organization.input';

@InputType()
export class OrganizationCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false})
    subdomain!: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => Date, {nullable:true})
    deletedAt?: Date | string;

    @Field(() => UserCreateNestedManyWithoutOrganizationInput, {nullable:true})
    users?: UserCreateNestedManyWithoutOrganizationInput;
}
