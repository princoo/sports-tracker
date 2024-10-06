import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  roleId: string;

  @IsString()
  nationality: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/, {
    message: 'Password must contain at least one digit.',
  })
  password: string;
}
export class LoginDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/, {
    message: 'Password must contain at least one digit.',
  })
  password: string;
}
