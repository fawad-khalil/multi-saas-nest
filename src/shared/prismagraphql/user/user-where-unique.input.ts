import { Field, InputType } from '@nestjs/graphql';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { EnumRoleTypesNullableFilter } from '../prisma/enum-role-types-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { RoleRelationFilter } from '../role/role-relation-filter.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  password?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  organizationId?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  userRoleId?: IntFilter;

  @Field(() => EnumRoleTypesNullableFilter, { nullable: true })
  roleType?: EnumRoleTypesNullableFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  deletedAt?: DateTimeNullableFilter;

  @Field(() => OrganizationRelationFilter, { nullable: true })
  organization?: OrganizationRelationFilter;

  @Field(() => RoleRelationFilter, { nullable: true })
  role?: RoleRelationFilter;
}
