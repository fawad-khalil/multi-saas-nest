import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { PermissionOrderByRelationAggregateInput } from '../permission/permission-order-by-relation-aggregate.input';
import { UserOrderByRelationAggregateInput } from '../user/user-order-by-relation-aggregate.input';

@InputType()
export class RoleOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    roleType?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    deletedAt?: SortOrderInput;

    @Field(() => PermissionOrderByRelationAggregateInput, {nullable:true})
    permissions?: PermissionOrderByRelationAggregateInput;

    @Field(() => UserOrderByRelationAggregateInput, {nullable:true})
    User?: UserOrderByRelationAggregateInput;
}
