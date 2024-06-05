import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomRequest } from 'src/types/custom-request';

@Injectable()
export class OrganizationMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: CustomRequest, _res: Response, next: NextFunction) {
    const subdomain = req.headers['x-subdomain'] as string;

    if (!subdomain) {
      throw new BadRequestException();
    }

    const organization = await this.prisma.organization.findUnique({
      where: { subdomain },
    });

    if (!organization) {
      throw new NotFoundException();
    }

    req.organization = organization;
    next();
  }
}
