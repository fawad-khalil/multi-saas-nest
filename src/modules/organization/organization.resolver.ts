import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlJWTGuard } from 'src/common/guards/auth/gql-jwt.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import {
  DeleteOneOrganizationArgs,
  FindManyOrganizationArgs,
  FindUniqueOrganizationArgs,
  Organization,
  UpdateOneOrganizationArgs,
} from 'src/shared/prismagraphql/organization';
import { CustomRequest } from 'src/types/custom-request';
import {
  CustomCreateOneOrganizationArgs,
  OrganizationService,
} from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Mutation(() => Organization, { nullable: true })
  create(@Args() args: CustomCreateOneOrganizationArgs) {
    return this.organizationService.create(args);
  }

  @UseGuards(GqlJWTGuard, RolesGuard)
  @Query(() => [Organization], { nullable: true })
  listOrganizations(
    @Args() args: FindManyOrganizationArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.organizationService.findMany(args, context.req.organization);
  }

  @UseGuards(GqlJWTGuard, RolesGuard)
  @Query(() => Organization, { nullable: true })
  findOne(
    @Args() args: FindUniqueOrganizationArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.organizationService.findUnique(args, context.req.organization);
  }

  @UseGuards(GqlJWTGuard, RolesGuard)
  @Mutation(() => Organization, { nullable: true })
  update(
    @Args() args: UpdateOneOrganizationArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.organizationService.update(args, context.req.organization);
  }

  @UseGuards(GqlJWTGuard, RolesGuard)
  @Mutation(() => Organization, { nullable: true })
  remove(
    @Args() args: DeleteOneOrganizationArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.organizationService.delete(args, context.req.organization);
  }
}
