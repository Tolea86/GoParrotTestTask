import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.mongo';
import { CreateAuthorDto } from '../dto/CreateAuthorDto';
import { FindOneAuthorDto } from '../dto/FindOneAuthorDto';
import { UpdateAuthorDto } from '../dto/UpdateAuthorDto';

@Controller('author')
export class AuthorController {

  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() : Promise<Author[]> {
    return this.authorService.getAllAuthors();
  }

  @Get('/:first_name/:last_name')
  getOneAuthor(@Param() findOneAuthorDto: FindOneAuthorDto) : Promise<Author> {
    return this.authorService.getOneAuthor(findOneAuthorDto);
  }

  @Post()
  addAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<{success: boolean}> {
    return this.authorService.addAuthor(createAuthorDto);
  }

  @Patch('/:first_name/:last_name')
  async updateAuthor(@Param() findOneAuthorDto: FindOneAuthorDto, @Body() updateAuthorDto: UpdateAuthorDto) {
    return await this.authorService.updateAuthor(findOneAuthorDto, updateAuthorDto);
  }

  @Delete('/:first_name/:last_name')
  deleteAuthor(@Param() findOneAuthorDto: FindOneAuthorDto) : Promise<{success: boolean}> {
    return this.authorService.deleteAuthor(findOneAuthorDto);
  }

}
