import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;

}
