import { IsString } from 'class-validator';

export class CreateCoachOnSiteDto {
  @IsString()
  siteId: string;

  @IsString()
  userId: string;
}
