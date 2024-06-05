import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationOrderByWithRelationInput } from './organization-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Int } from '@nestjs/graphql';
import { OrganizationCountAggregateInput } from './organization-count-aggregate.input';
import { OrganizationMinAggregateInput } from './organization-min-aggregate.input';
import { OrganizationMaxAggregateInput } from './organization-max-aggregate.input';

@ArgsType()
export class OrganizationAggregateArgs {

    @Field(() => OrganizationWhereInput, {nullable:true})
    @Type(() => OrganizationWhereInput)
    where?: OrganizationWhereInput;

    @Field(() => [OrganizationOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<OrganizationOrderByWithRelationInput>;

    @Field(() => OrganizationWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'name' | 'subdomain' | 'name'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => OrganizationCountAggregateInput, {nullable:true})
    _count?: OrganizationCountAggregateInput;

    @Field(() => OrganizationMinAggregateInput, {nullable:true})
    _min?: OrganizationMinAggregateInput;

    @Field(() => OrganizationMaxAggregateInput, {nullable:true})
    _max?: OrganizationMaxAggregateInput;
}
