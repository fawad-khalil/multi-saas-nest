import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RoleTypesEnum } from '../src/roles/roles.enum';

const prisma = new PrismaClient();
async function main() {
  const superAdminRole = await prisma.role.upsert({
    where: { roleType: RoleTypesEnum.SUPER_ADMIN },
    update: {},
    create: {
      name: 'Super Admin',
      roleType: RoleTypesEnum.SUPER_ADMIN,
    },
  });
  const orgAdminRole = await prisma.role.upsert({
    where: { roleType: RoleTypesEnum.ORG_ADMIN },
    update: {},
    create: {
      name: 'Organization Admin',
      roleType: RoleTypesEnum.ORG_ADMIN,
    },
  });
  const orgUserRole = await prisma.role.upsert({
    where: { roleType: RoleTypesEnum.ORG_USER },
    update: {},
    create: {
      name: 'Organization User',
      roleType: RoleTypesEnum.ORG_USER,
    },
  });

  await prisma.permission.create({
    data: {
      rolePermissionsId: superAdminRole.id,
      modelName: '*',
      allowedOperations: [
        'create',
        'delete',
        'get',
        'list',
        'onCreate',
        'onDelete',
        'onUpdate',
        'search',
        'update',
      ],
    },
  });

  await prisma.permission.create({
    data: {
      rolePermissionsId: orgAdminRole.id,
      modelName: '*',
      allowedOperations: [
        'create',
        'delete',
        'get',
        'list',
        'onCreate',
        'onDelete',
        'onUpdate',
        'search',
        'update',
      ],
    },
  });

  await prisma.permission.create({
    data: {
      rolePermissionsId: orgUserRole.id,
      modelName: '*',
      allowedOperations: [
        'create',
        'get',
        'list',
        'onCreate',
        'onDelete',
        'onUpdate',
        'search',
        'update',
      ],
    },
  });
  const superAdminOrg = await prisma.organization.upsert({
    where: { subdomain: 'default-org' },
    update: {},
    create: {
      name: 'Default Organization - Dont delete',
      subdomain: 'default-org',
    },
  });
  const hashedPassword = await bcrypt.hash('1q2w3e4r', 10);
  await prisma.user.upsert({
    where: { email: 'superadmin@default.org' },
    update: {},
    create: {
      email: 'superadmin@default.org',
      password: hashedPassword,
      name: 'Super Admin',
      userRoleId: superAdminRole.id as never,
      organizationId: superAdminOrg.id,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
