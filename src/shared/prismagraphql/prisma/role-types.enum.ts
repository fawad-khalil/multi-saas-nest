import { registerEnumType } from '@nestjs/graphql';

export enum RoleTypes {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN"
}


registerEnumType(RoleTypes, { name: 'RoleTypes', description: undefined })
