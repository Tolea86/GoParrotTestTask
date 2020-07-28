import { IsNotEmpty, IsString } from 'class-validator';

export class FindBookByTitle {
  @IsString()
  @IsNotEmpty()
  title: string;
}
