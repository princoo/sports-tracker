import { Gender } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { FootEnum } from 'src/players/dto/create-player.dto';
import { FootballPosition } from 'src/players/dto/player-position.enum';

export class CreatePlayerTestDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(FootEnum, { each: true })
  foot: FootEnum;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  acadStatus: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(FootballPosition, { each: true })
  positions: FootballPosition[];

  @IsString()
  @IsNotEmpty()
  @IsEnum(Gender, { each: true })
  gender: Gender;
}
