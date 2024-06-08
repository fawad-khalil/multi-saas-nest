import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BaseCrudService } from 'src/base-crud/base-crud.service';
import { RoleTypesEnum } from 'src/modules/roles/roles.enum';
import { RolesService } from 'src/modules/roles/roles.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Organization } from 'src/shared/prismagraphql/organization';
import {
  CreateManyUserArgs,
  CreateOneUserArgs,
  DeleteManyUserArgs,
  DeleteOneUserArgs,
  FindFirstUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateManyUserArgs,
  UpdateOneUserArgs,
  User,
} from 'src/shared/prismagraphql/user';
import { LoginOutput, LoginTypeEnum, LoginUserInput } from './dto/login-user';

@Injectable()
export class UserService extends BaseCrudService<
  User,
  FindFirstUserArgs,
  FindUniqueUserArgs,
  FindManyUserArgs,
  CreateOneUserArgs,
  CreateManyUserArgs,
  UpdateOneUserArgs,
  UpdateManyUserArgs,
  DeleteOneUserArgs,
  DeleteManyUserArgs
> {
  constructor(
    prisma: PrismaService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {
    super(prisma);
  }

  async create(args: CreateOneUserArgs): Promise<User> {
    const { data: userData } = args;

    if (!userData.organization) {
      throw new BadRequestException({ message: 'Organization is missing.' });
    }

    const hashedPassword = await bcrypt.hash(args.data.password, 10);
    args.data.password = hashedPassword;

    let role = null;

    if (!userData.roleType) {
      role = await this.rolesService.findUnique({
        where: { roleType: RoleTypesEnum.ORG_USER },
      });
    } else {
      role = await this.rolesService.findUnique({
        where: { roleType: userData.roleType },
      });
    }

    return super.create({
      data: {
        ...userData,
        password: hashedPassword,
        organization: args.data.organization,
        roleType: userData.roleType,
        role,
      },
    });
  }

  async update(args: UpdateOneUserArgs, org: Organization): Promise<User> {
    if (args.data.password) {
      const hashedPassword = await bcrypt.hash(args.data.password, 10);
      args.data.password = hashedPassword;
    }
    return super.update(args, org);
  }

  async login(args: LoginUserInput): Promise<LoginOutput> {
    if (args.type === LoginTypeEnum.REFRESH) {
      if (!args.refresh_token) {
        throw new BadRequestException();
      }

      const user = this.jwtService.decode(args.refresh_token);
      const payload = { sub: user.id, email: user.email };
      const newAccessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION,
      });
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION,
      });

      return {
        access_token: newAccessToken,
        refresh_token: refreshToken,
        status: true,
      };
    }

    const user = await this.prisma.user.findUnique({
      where: { email: args.email },
    });

    if (!user || !(await bcrypt.compare(args.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      status: true,
    };
  }
}
