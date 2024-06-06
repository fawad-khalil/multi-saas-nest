import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateManyOrganizationInput } from './user-create-many-organization.input';
import { Type } from 'class-transformer';

@InputType()
export class UserCreateManyOrganizationInputEnvelope {

    @Field(() => [UserCreateManyOrganizationInput], {nullable:false})
    @Type(() => UserCreateManyOrganizationInput)
    data!: Array<UserCreateManyOrganizationInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
