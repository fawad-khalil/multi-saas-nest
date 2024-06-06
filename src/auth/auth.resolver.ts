import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOneUserArgs, User } from 'src/shared/prismagraphql/user';
import { CustomRequest } from 'src/types/custom-request';
import { LoginOutput, LoginUserInput } from 'src/user/dto/login-user';
import { UserService } from 'src/user/user.service';
@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => LoginOutput, { nullable: false })
  async login(@Args() args: LoginUserInput) {
    return this.userService.login(args);
  }

  @Mutation(() => User, { nullable: false })
  registerUser(
    @Args() args: CreateOneUserArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.userService.create(args, context.req.organization);
  }
}
