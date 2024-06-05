import { Organization } from '@prisma/client';
import { User } from 'src/shared/prismagraphql/user';

export interface CustomRequest extends Request {
  organization?: Organization;
  user?: User;
}
