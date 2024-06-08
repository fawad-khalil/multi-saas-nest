import { Test, TestingModule } from '@nestjs/testing';
import {
  DeleteOneUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  User,
} from 'src/shared/prismagraphql/user';
import { CustomRequest } from 'src/types/custom-request';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  const mockUserService = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockOrganization = { id: 'org-123' };
  const mockContext = { req: { organization: mockOrganization } } as {
    req: CustomRequest;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const args: FindUniqueUserArgs = { where: { id: '1' } };
      const expectedResult = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      } as User;
      mockUserService.findUnique.mockResolvedValue(expectedResult);

      const result = await resolver.findOne(args, mockContext);

      expect(result).toEqual(expectedResult);
      expect(service.findUnique).toHaveBeenCalledWith(args, mockOrganization);
    });
  });

  describe('listUsers', () => {
    it('should return an array of users', async () => {
      const args: FindManyUserArgs = { where: {} };
      const expectedResult = [
        { id: '1', name: 'Test User', email: 'test@example.com' },
      ] as User[];
      mockUserService.findMany.mockResolvedValue(expectedResult);

      const result = await resolver.listUsers(args, mockContext);

      expect(result).toEqual(expectedResult);
      expect(service.findMany).toHaveBeenCalledWith(args, mockOrganization);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const args: UpdateOneUserArgs = {
        data: { id: { set: '1' }, name: { set: 'Updated User' } },
        where: { id: '1' },
      };
      const expectedResult = {
        id: '1',
        name: 'Updated User',
        email: 'test@example.com',
      } as User;
      mockUserService.update.mockResolvedValue(expectedResult);

      const result = await resolver.update(args, mockContext);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(args, mockOrganization);
    });
  });

  describe('remove', () => {
    it('should delete and return the user', async () => {
      const args: DeleteOneUserArgs = { where: { id: '1' } };
      const expectedResult = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      } as User;
      mockUserService.delete.mockResolvedValue(expectedResult);

      const result = await resolver.remove(args, mockContext);

      expect(result).toEqual(expectedResult);
      expect(service.delete).toHaveBeenCalledWith(args, mockOrganization);
    });
  });
});
