import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum TestMetrics {
  accuracy = 'accuracy',
  bodyPosition = 'bodyPosition',
  totalTime = 'totalTime',
  attempts = 'attempts',
  successes = 'successes',
  power = 'power',
  conesTouched = 'conesTouched',
  foot = 'foot',
  errors = 'errors',
  distance = 'distance',
  ballControll = 'ballControll',
}

export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsEnum(TestMetrics, { each: true })
  requiredMetrics: TestMetrics[];
}
