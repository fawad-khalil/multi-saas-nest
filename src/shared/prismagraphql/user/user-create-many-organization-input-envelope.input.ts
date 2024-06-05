import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UserCreateManyOrganizationInput } from './user-create-many-organization.input';

@InputType()
export class UserCreateManyOrganizationInputEnvelope {
  @Field(() => [UserCreateManyOrganizationInput], { nullable: false })
  @Type(() => UserCreateManyOrganizationInput)
  data!: Array<UserCreateManyOrganizationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
