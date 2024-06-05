import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UserCreateInput } from '../user';
import { OrganizationCreateInput } from './organization-create.input';

@ArgsType()
export class CreateOneOrganizationArgs {
  @Field(() => OrganizationCreateInput, { nullable: false })
  @Type(() => OrganizationCreateInput)
  data!: { organization: OrganizationCreateInput; user: UserCreateInput };
}
