import { Field, InputType, Int } from '@nestjs/graphql';
import { PermissionListRelationFilter } from '../permission/permission-list-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { EnumRoleTypesFilter } from '../prisma/enum-role-types-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UserListRelationFilter } from '../user/user-list-relation-filter.input';
import { RoleWhereInput } from './role-where.input';

@InputType()
export class RoleWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [RoleWhereInput], { nullable: true })
  AND?: Array<RoleWhereInput>;

  @Field(() => [RoleWhereInput], { nullable: true })
  OR?: Array<RoleWhereInput>;

  @Field(() => [RoleWhereInput], { nullable: true })
  NOT?: Array<RoleWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => EnumRoleTypesFilter, { nullable: true })
  roleType?: EnumRoleTypesFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  deletedAt?: DateTimeNullableFilter;

  @Field(() => PermissionListRelationFilter, { nullable: true })
  permissions?: PermissionListRelationFilter;

  @Field(() => UserListRelationFilter, { nullable: true })
  User?: UserListRelationFilter;
}
