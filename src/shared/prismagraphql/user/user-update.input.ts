import { Field, InputType } from '@nestjs/graphql';
import { OrganizationUpdateOneRequiredWithoutUsersNestedInput } from '../organization/organization-update-one-required-without-users-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { NullableEnumRoleTypesFieldUpdateOperationsInput } from '../prisma/nullable-enum-role-types-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { RoleUpdateOneRequiredWithoutUserNestedInput } from '../role/role-update-one-required-without-user-nested.input';

@InputType()
export class UserUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  email?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  password?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => NullableEnumRoleTypesFieldUpdateOperationsInput, {
    nullable: true,
  })
  roleType?: NullableEnumRoleTypesFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => NullableDateTimeFieldUpdateOperationsInput, { nullable: true })
  deletedAt?: NullableDateTimeFieldUpdateOperationsInput;

  @Field(() => OrganizationUpdateOneRequiredWithoutUsersNestedInput, {
    nullable: true,
  })
  organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput;

  @Field(() => RoleUpdateOneRequiredWithoutUserNestedInput, { nullable: true })
  role?: RoleUpdateOneRequiredWithoutUserNestedInput;
}
