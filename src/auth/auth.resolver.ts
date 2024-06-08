import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginOutput, LoginUserInput } from 'src/modules/user/dto/login-user';
import { UserService } from 'src/modules/user/user.service';
import { CreateOneUserArgs, User } from 'src/shared/prismagraphql/user';
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
