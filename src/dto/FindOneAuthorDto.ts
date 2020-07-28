import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneAuthorDto {

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;
}
