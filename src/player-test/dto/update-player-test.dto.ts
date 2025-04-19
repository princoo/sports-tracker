import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerTestDto } from './create-player-test.dto';

export class UpdatePlayerTestDto extends PartialType(CreatePlayerTestDto) {}
