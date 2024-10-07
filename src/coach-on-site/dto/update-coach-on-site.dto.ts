import { PartialType } from '@nestjs/mapped-types';
import { CreateCoachOnSiteDto } from './create-coach-on-site.dto';

export class UpdateCoachOnSiteDto extends PartialType(CreateCoachOnSiteDto) {}
