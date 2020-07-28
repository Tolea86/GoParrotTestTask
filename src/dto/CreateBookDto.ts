import { IsIBAN, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  @IsIBAN()
  iban: string;

  @IsNumberString()
  @IsNotEmpty()
  published_at: number;

}
