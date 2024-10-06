import { IsString } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  name: string;

  @IsString()
  province: string;

  @IsString()
  district: string;
}
