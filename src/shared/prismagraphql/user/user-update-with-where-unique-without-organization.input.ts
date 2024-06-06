import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutOrganizationInput } from './user-update-without-organization.input';

@InputType()
export class UserUpdateWithWhereUniqueWithoutOrganizationInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

    @Field(() => UserUpdateWithoutOrganizationInput, {nullable:false})
    @Type(() => UserUpdateWithoutOrganizationInput)
    data!: UserUpdateWithoutOrganizationInput;
}
