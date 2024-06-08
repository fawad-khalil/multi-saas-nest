import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOneUserArgs, User } from 'src/shared/prismagraphql/user';
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
  registerUser(@Args() args: CreateOneUserArgs) {
    return this.userService.create(args);
  }
}
