import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@ArgsType()
export class FindUniqueRoleArgs {
  @Field(() => RoleWhereUniqueInput, { nullable: false })
  @Type(() => RoleWhereUniqueInput)
  where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id'>;
}
