import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UserCreateInput } from '../user';
import { OrganizationCreateInput } from './organization-create.input';

class CreateOneOrganizationData {
  @Field(() => OrganizationCreateInput, { nullable: false })
  @Type(() => OrganizationCreateInput)
  organization!: OrganizationCreateInput;

  @Field(() => UserCreateInput, { nullable: false })
  @Type(() => UserCreateInput)
  adminUser!: UserCreateInput;
}

@ArgsType()
export class CreateOneOrganizationArgs {
  data!: CreateOneOrganizationData;
}
