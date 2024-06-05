import { registerEnumType } from '@nestjs/graphql';

export enum RoleScalarFieldEnum {
    id = "id",
    name = "name",
    roleType = "roleType",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    deletedAt = "deletedAt"
}


registerEnumType(RoleScalarFieldEnum, { name: 'RoleScalarFieldEnum', description: undefined })
