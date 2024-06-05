import { OrganizationMiddleware } from './organization.middleware';

describe('OrganizationMiddleware', () => {
  it('should be defined', () => {
    expect(new OrganizationMiddleware()).toBeDefined();
  });
});
