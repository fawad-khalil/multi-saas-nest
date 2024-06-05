import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOneUserArgs, User } from 'src/shared/prismagraphql/user';
// import { UserService } from 'src/shared/services/user.service';
import { UserService } from 'src/user/user.service';
// import { LoginArgs } from '../custom-data/args/login.args';
// import { LoginData } from '../custom-data/return-type/return-types';
// import { CreateOneUserArgs, User } from '../prismagraphql/user';
@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => LoginData, { nullable: false })
  async login(@Args() args: LoginArgs) {
    return this.userService.login(args);
  }
  @Mutation(() => User, { nullable: false })
  registerUser(@Args() args: CreateOneUserArgs) {
    return this.userService.create(args);
  }
}
