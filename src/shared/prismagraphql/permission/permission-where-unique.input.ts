import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { PermissionWhereInput } from './permission-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumOperationNullableListFilter } from '../prisma/enum-operation-nullable-list-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { RoleRelationFilter } from '../role/role-relation-filter.input';

@InputType()
export class PermissionWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [PermissionWhereInput], {nullable:true})
    AND?: Array<PermissionWhereInput>;

    @Field(() => [PermissionWhereInput], {nullable:true})
    OR?: Array<PermissionWhereInput>;

    @Field(() => [PermissionWhereInput], {nullable:true})
    NOT?: Array<PermissionWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    modelName?: StringFilter;

    @Field(() => EnumOperationNullableListFilter, {nullable:true})
    allowedOperations?: EnumOperationNullableListFilter;

    @Field(() => IntFilter, {nullable:true})
    rolePermissionsId?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    deletedAt?: DateTimeNullableFilter;

    @Field(() => RoleRelationFilter, {nullable:true})
    role?: RoleRelationFilter;
}
