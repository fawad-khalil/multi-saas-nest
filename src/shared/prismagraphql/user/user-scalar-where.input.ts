import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { EnumRoleTypesNullableFilter } from '../prisma/enum-role-types-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class UserScalarWhereInput {
  @Field(() => [UserScalarWhereInput], { nullable: true })
  AND?: Array<UserScalarWhereInput>;

  @Field(() => [UserScalarWhereInput], { nullable: true })
  OR?: Array<UserScalarWhereInput>;

  @Field(() => [UserScalarWhereInput], { nullable: true })
  NOT?: Array<UserScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;

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
}
