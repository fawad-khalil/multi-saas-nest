import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  email!: number;

  @Field(() => Int, { nullable: false })
  password!: number;

  @Field(() => Int, { nullable: false })
  name!: number;

  @Field(() => Int, { nullable: false })
  organizationId!: number;

  @Field(() => Int, { nullable: false })
  userRoleId!: number;

  @Field(() => Int, { nullable: false })
  roleType!: number;

  @Field(() => Int, { nullable: false })
  createdAt!: number;

  @Field(() => Int, { nullable: false })
  updatedAt!: number;

  @Field(() => Int, { nullable: false })
  deletedAt!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
