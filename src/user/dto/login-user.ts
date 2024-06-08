import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

export enum LoginTypeEnum {
  PASSWORD = 'password',
  REFRESH = 'refresh_token',
}

@ArgsType()
export class LoginUserInput {
  @Field(() => String, { nullable: false })
  email?: string;
  @Field(() => String, { nullable: false })
  password?: string;
  @Field(() => String, { nullable: true, defaultValue: LoginTypeEnum.PASSWORD })
  type: string;
  @Field(() => String, { nullable: true })
  refresh_token?: string;
}

@ObjectType()
export class LoginOutput {
  @Field(() => String, { nullable: true })
  access_token?: string;
  @Field(() => String, { nullable: true })
  refresh_token?: string;
  @Field(() => Boolean, { nullable: false })
  status: boolean;
  @Field(() => String, { nullable: true })
  error?: string;
}
