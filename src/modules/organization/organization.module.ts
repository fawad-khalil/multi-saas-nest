import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

@Module({
  imports: [UserModule],
  providers: [OrganizationResolver, OrganizationService],
})
export class OrganizationModule {}
