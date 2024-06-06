import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  User,
} from 'src/shared/prismagraphql/user';
import { CustomRequest } from 'src/types/custom-request';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: false })
  findOne(
    @Args() args: FindUniqueUserArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.userService.findUnique(args, context.req.organization);
  }

  @Query(() => [User], { nullable: false })
  listUsers(
    @Args() args: FindManyUserArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.userService.findMany(args, context.req.organization);
  }

  @Mutation(() => User, { nullable: true })
  update(
    @Args() args: UpdateOneUserArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.userService.update(args, context.req.organization);
  }

  @Mutation(() => User, { nullable: true })
  remove(
    @Args() args: DeleteOneUserArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.userService.delete(args, context.req.organization);
  }
}
