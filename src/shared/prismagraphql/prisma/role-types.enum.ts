import { registerEnumType } from '@nestjs/graphql';

export enum RoleTypes {
    SUPER_ADMIN = "SUPER_ADMIN",
    ORG_ADMIN = "ORG_ADMIN",
    ORG_USER = "ORG_USER"
}


registerEnumType(RoleTypes, { name: 'RoleTypes', description: undefined })
