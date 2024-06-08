import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleTypesEnum } from 'src/roles/roles.enum';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from './user.service';

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let rolesService: RolesService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: RolesService,
          useValue: {
            findUnique: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verifyAsync: jest.fn(),
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    rolesService = module.get<RolesService>(RolesService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with hashed password', async () => {
      const org = { id: 'org1' } as any;
      const role = {
        connect: { id: 3, roleType: RoleTypesEnum.ORG_USER },
      };
      const userInput = {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          roleType: RoleTypesEnum.ORG_USER,
          organization: org,
          role,
        },
      };

      const hashedPassword = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      rolesService.findUnique = jest.fn().mockResolvedValue(role);

      const createdUser = {
        id: 'user1',
        ...userInput.data,
        password: hashedPassword,
        role,
      };
      prismaService.user.create = jest.fn().mockResolvedValue(createdUser);

      const result = await service.create(userInput);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(rolesService.findUnique).toHaveBeenCalledWith({
        where: { roleType: RoleTypesEnum.ORG_USER },
      });
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...userInput.data,
          password: hashedPassword,
          organization: { connect: { id: org.id } },
          role,
        },
      });
      expect(result).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update a user with hashed password', async () => {
      const org = { id: 'org1' } as any;
      const userInput = {
        data: {
          password: { set: 'newPassword123' },
        },
        where: {
          id: 'user1',
        },
      };

      const hashedPassword = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const updatedUser = {
        id: 'user1',
        ...userInput.data,
        password: hashedPassword,
      };
      prismaService.user.update = jest.fn().mockResolvedValue(updatedUser);

      const result = await service.update(userInput, org);

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        ...userInput,
        data: {
          ...userInput.data,
          password: hashedPassword,
        },
      });
      expect(result).toEqual(updatedUser);
    });

    it('should update a user without changing password', async () => {
      const org = { id: 'org1' } as any;
      const userInput = {
        data: {
          email: { set: 'newemail@example.com' },
        },
        where: {
          id: 'user1',
        },
      };

      const updatedUser = { id: 'user1', ...userInput.data };
      prismaService.user.update = jest.fn().mockResolvedValue(updatedUser);

      const result = await service.update(userInput, org);

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(prismaService.user.update).toHaveBeenCalledWith(userInput);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('login', () => {
    it('should throw an error if user is not found', async () => {
      const loginArgs = {
        email: 'test@example.com',
        password: 'password123',
        type: 'password',
      };
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.login(loginArgs)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an error if password is incorrect', async () => {
      const loginArgs = {
        email: 'test@example.com',
        password: 'password123',
        type: 'password',
      };
      const user = {
        id: 'user1',
        email: loginArgs.email,
        password: 'hashedPassword',
      };
      prismaService.user.findUnique = jest.fn().mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginArgs)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return tokens if login is successful', async () => {
      const loginArgs = {
        email: 'test@example.com',
        password: 'password123',
        type: 'password',
      };
      const user = {
        id: 'user1',
        email: loginArgs.email,
        password: 'hashedPassword',
      };
      prismaService.user.findUnique = jest.fn().mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';
      jwtService.sign = jest
        .fn()
        .mockReturnValueOnce(accessToken)
        .mockReturnValueOnce(refreshToken);

      const result = await service.login(loginArgs);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginArgs.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginArgs.password,
        user.password,
      );
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        access_token: accessToken,
        refresh_token: refreshToken,
        status: true,
      });
    });

    it('should refresh tokens if refresh token is provided', async () => {
      const loginArgs = {
        type: 'refresh_token',
        refresh_token: 'refreshToken',
      };
      const decodedUser = { id: 'user1', email: 'test@example.com' };
      jwtService.decode = jest.fn().mockReturnValue(decodedUser);

      const accessToken = 'newAccessToken';
      const refreshToken = 'newRefreshToken';
      jwtService.sign = jest
        .fn()
        .mockReturnValueOnce(accessToken)
        .mockReturnValueOnce(refreshToken);

      const result = await service.login(loginArgs);

      expect(jwtService.decode).toHaveBeenCalledWith(loginArgs.refresh_token);
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        access_token: accessToken,
        refresh_token: refreshToken,
        status: true,
      });
    });

    it('should throw an error if refresh token is missing', async () => {
      const loginArgs = { type: 'REFRESH' };

      await expect(service.login(loginArgs)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
