import { User as prismaUser, Role, Profile } from '@prisma/client';
export interface User
  extends Omit<prismaUser, 'password' | 'createdAt' | 'updatedAt'> {
  role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>;
  profile: Profile;
}
