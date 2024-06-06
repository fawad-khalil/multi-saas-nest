import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUncheckedCreateNestedManyWithoutOrganizationInput } from '../user/user-unchecked-create-nested-many-without-organization.input';

@InputType()
export class OrganizationUncheckedCreateInput {

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

    @Field(() => String, {nullable:true})
    updatedBy?: string;

    @Field(() => UserUncheckedCreateNestedManyWithoutOrganizationInput, {nullable:true})
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput;
}
