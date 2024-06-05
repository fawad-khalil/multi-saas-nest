import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutUsersInput } from './organization-update-without-users.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutUsersInput {

    @Field(() => OrganizationWhereInput, {nullable:true})
    @Type(() => OrganizationWhereInput)
    where?: OrganizationWhereInput;

    @Field(() => OrganizationUpdateWithoutUsersInput, {nullable:false})
    @Type(() => OrganizationUpdateWithoutUsersInput)
    data!: OrganizationUpdateWithoutUsersInput;
}
