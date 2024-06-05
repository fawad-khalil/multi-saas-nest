import { Field, InputType } from '@nestjs/graphql';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { EnumRoleTypesNullableWithAggregatesFilter } from '../prisma/enum-role-types-nullable-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class UserScalarWhereWithAggregatesInput {
  @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<UserScalarWhereWithAggregatesInput>;

  @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<UserScalarWhereWithAggregatesInput>;

  @Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<UserScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  email?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  password?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  organizationId?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  userRoleId?: IntWithAggregatesFilter;

  @Field(() => EnumRoleTypesNullableWithAggregatesFilter, { nullable: true })
  roleType?: EnumRoleTypesNullableWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter;

  @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
  deletedAt?: DateTimeNullableWithAggregatesFilter;
}
