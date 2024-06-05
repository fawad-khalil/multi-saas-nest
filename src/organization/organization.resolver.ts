import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateOneOrganizationArgs,
  DeleteOneOrganizationArgs,
  FindManyOrganizationArgs,
  FindUniqueOrganizationArgs,
  Organization,
  UpdateOneOrganizationArgs,
} from 'src/shared/prismagraphql/organization';
import { CustomRequest } from 'src/types/custom-request';
import { OrganizationService } from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Mutation(() => Organization, { nullable: true })
  create(
    @Args()
    args: CreateOneOrganizationArgs,
  ) {
    return this.organizationService.create(args);
  }

  @Query(() => [Organization], { nullable: true })
  listOrganizations(
    @Args() args: FindManyOrganizationArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.organizationService.findMany(args, context.req.organization);
  }

  @Query(() => Organization, { nullable: true })
  findOne(
    @Args() args: FindUniqueOrganizationArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.organizationService.findUnique(args, context.req.organization);
  }

  @Mutation(() => Organization, { nullable: true })
  update(
    @Args() args: UpdateOneOrganizationArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.organizationService.update(args, context.req.organization);
  }

  @Mutation(() => Organization, { nullable: true })
  remove(
    @Args() args: DeleteOneOrganizationArgs,
    @Context() context: { req: CustomRequest },
  ) {
    return this.organizationService.delete(args, context.req.organization);
  }
}
