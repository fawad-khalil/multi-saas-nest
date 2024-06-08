import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Organization } from 'src/shared/prismagraphql/organization';

interface BaseWhereArgs {
  where?: Record<string, any>;
  include?: Record<string, any>;
}

interface BaseCreateArgs {
  data?: Record<string, any>;
}

@Injectable()
export class BaseCrudService<
  T,
  FindFirstArg extends BaseWhereArgs,
  FindUniqueArg extends BaseWhereArgs,
  FindManyArg extends BaseWhereArgs,
  CreateArg extends BaseCreateArgs,
  CreateManyArg extends BaseCreateArgs,
  UpdateArg extends BaseWhereArgs,
  UpdatedManyArg extends BaseWhereArgs,
  DeleteArg extends BaseWhereArgs,
  DeleteManyArg extends BaseWhereArgs,
> {
  constructor(public prisma: PrismaService) {}

  async findFirst(
    args: FindFirstArg,
    org: Organization,
    include?: any,
  ): Promise<T | null> {
    return this.prisma[this.getModelName()].findFirst({
      ...args,
      where: { ...args.where, organizationId: org?.id },
      include,
    });
  }

  findUnique(args: FindUniqueArg, org: Organization): Promise<T | null> {
    return this.prisma[this.getModelName()].findUnique({
      ...args,
      where: { ...args.where, organizationId: org?.id },
    });
  }

  findMany(args: FindManyArg, org: Organization): Promise<T[]> {
    return this.prisma[this.getModelName()].findMany({
      ...args,
      where: { ...args.where, organizationId: org?.id },
    });
  }

  create(args: CreateArg, org?: Organization): Promise<T> {
    return this.prisma[this.getModelName()].create({
      ...args,
      data: { ...args.data, ...(org ? { organizationId: org?.id } : {}) },
    });
  }

  createMany(args: CreateManyArg, org: Organization, skipDuplicates: boolean) {
    const dataWithOrg = args.data.map((item) => ({
      ...item,
      organizationId: org?.id,
    }));
    return this.prisma[this.getModelName()].createMany({
      data: dataWithOrg,
      skipDuplicates,
    });
  }

  update(args: UpdateArg, org: Organization): Promise<T> {
    return this.prisma[this.getModelName()].update({
      ...args,
      where: { ...args.where, organizationId: org?.id },
    });
  }

  updateMany(args: UpdatedManyArg, org: Organization): Promise<T[]> {
    return this.prisma[this.getModelName()].updateMany({
      ...args,
      where: { ...args.where, organizationId: org?.id },
    });
  }

  delete(args: DeleteArg, org: Organization): Promise<T> {
    return this.prisma[this.getModelName()].delete({
      ...args,
      where: { ...args.where, organizationId: org.id },
    });
  }

  deleteMany(args: DeleteManyArg, org: Organization): Promise<T[]> {
    return this.prisma[this.getModelName()].deleteMany({
      ...args,
      where: { ...args.where, organizationId: org.id },
    });
  }
  private getModelName(): string {
    return this.constructor.name.replace('Service', '');
  }
}
