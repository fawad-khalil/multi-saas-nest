import { Field, InputType } from '@nestjs/graphql';
import { NestedEnumRoleTypesFilter } from './nested-enum-role-types-filter.input';
import { RoleTypes } from './role-types.enum';

@InputType()
export class EnumRoleTypesFilter {
  @Field(() => RoleTypes, { nullable: true })
  equals?: keyof typeof RoleTypes;

  @Field(() => [RoleTypes], { nullable: true })
  in?: Array<keyof typeof RoleTypes>;

  @Field(() => [RoleTypes], { nullable: true })
  notIn?: Array<keyof typeof RoleTypes>;

  @Field(() => NestedEnumRoleTypesFilter, { nullable: true })
  not?: NestedEnumRoleTypesFilter;
}
