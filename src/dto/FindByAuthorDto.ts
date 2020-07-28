import { IsNotEmpty, IsString } from 'class-validator';

export class FindByAuthorDto {
  @IsString()
  @IsNotEmpty()
  author: string;
}
