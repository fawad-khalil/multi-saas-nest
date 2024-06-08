import { Test, TestingModule } from '@nestjs/testing';
import {
  DeleteOneOrganizationArgs,
  FindManyOrganizationArgs,
  FindUniqueOrganizationArgs,
  Organization,
  UpdateOneOrganizationArgs,
} from 'src/shared/prismagraphql/organization';
import { CustomRequest } from 'src/types/custom-request';
import { OrganizationResolver } from './organization.resolver';
import {
  CustomCreateOneOrganizationArgs,
  OrganizationService,
} from './organization.service';

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver;

  let service: OrganizationService;

  const mockOrganizationService = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationResolver,
        { provide: OrganizationService, useValue: mockOrganizationService },
      ],
    }).compile();

    resolver = module.get<OrganizationResolver>(OrganizationResolver);
    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create', () => {
    it('should create an organization', async () => {
      const args: CustomCreateOneOrganizationArgs = {
        data: {
          organization: { name: 'Test Org', subdomain: 'test-org' },
          adminUser: {
            name: 'Test Admin',
            email: 'test@test-org.com',
            password: '1q2w3e4r',
            organization: {},
            role: {},
          },
        },
      };
      const result = {
        id: '1',
        ...args.data.organization,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as Organization;
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await resolver.create(args)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(args);
    });
  });

  describe('listOrganizations', () => {
    it('should return an array of organizations', async () => {
      const args: FindManyOrganizationArgs = {};
      const req: CustomRequest = { organization: { id: '1' } } as CustomRequest;
      const result = [
        {
          id: '1',
          name: 'Test Org',
          subdomain: 'test-org',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ] as Organization[];
      jest.spyOn(service, 'findMany').mockResolvedValue(result);

      expect(await resolver.listOrganizations(args, { req })).toEqual(result);
      expect(service.findMany).toHaveBeenCalledWith(args, req.organization);
    });
  });

  describe('findOne', () => {
    it('should return a single organization', async () => {
      const args: FindUniqueOrganizationArgs = { where: { id: '1' } };
      const req: CustomRequest = {
        organization: {
          id: '1',
        },
      } as CustomRequest;
      const result = {
        id: '1',
        name: 'Test Org',
        subdomain: 'test-org',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Organization;
      jest.spyOn(service, 'findUnique').mockResolvedValue(result);

      expect(await resolver.findOne(args, { req })).toEqual(result);
      expect(service.findUnique).toHaveBeenCalledWith(args, req.organization);
    });
  });

  describe('update', () => {
    it('should update an organization', async () => {
      const args: UpdateOneOrganizationArgs = {
        where: { id: '1' },
        data: { name: { set: 'Updated Org' } },
      };
      const req: CustomRequest = {
        organization: {
          id: '1',
        },
      } as CustomRequest;
      const result = {
        id: '1',
        name: 'Updated Org',
        subdomain: 'test-org',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Organization;
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await resolver.update(args, { req })).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(args, req.organization);
    });
  });

  describe('remove', () => {
    it('should delete an organization', async () => {
      const args: DeleteOneOrganizationArgs = { where: { id: '1' } };
      const req: CustomRequest = {
        organization: {
          id: '1',
        },
      } as CustomRequest;
      const result = {
        id: '1',
        name: 'Test Org',
        subdomain: 'test-org',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Organization;
      jest.spyOn(service, 'delete').mockResolvedValue(result);

      expect(await resolver.remove(args, { req })).toEqual(result);
      expect(service.delete).toHaveBeenCalledWith(args, req.organization);
    });
  });
});
