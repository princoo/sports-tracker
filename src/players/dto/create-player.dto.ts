import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Gender } from 'src/auth/dto/create-user.dto';
import { FootballPosition } from './player-position.enum';

export enum FootEnum {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  BOTH = 'BOTH',
}

export class CreatePlayerDto {
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
