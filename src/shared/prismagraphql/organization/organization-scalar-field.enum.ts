import { registerEnumType } from '@nestjs/graphql';

export enum OrganizationScalarFieldEnum {
    id = "id",
    name = "name",
    subdomain = "subdomain",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    deletedAt = "deletedAt"
}


registerEnumType(OrganizationScalarFieldEnum, { name: 'OrganizationScalarFieldEnum', description: undefined })
