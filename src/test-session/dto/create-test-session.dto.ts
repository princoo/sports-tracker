import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateTestSessionDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsArray()
  @ArrayNotEmpty()
  tests: string[];
}
