import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.mongo';
import { FindByAuthorDto } from '../dto/FindByAuthorDto';
import { FindBookByTitle } from '../dto/FindBookByTitle';
import { CreateBookDto } from '../dto/CreateBookDto';
import { UpdateBookDto } from '../dto/UpdateBookDto';

@Controller('book')
export class BookController {

  constructor(private readonly bookService: BookService) {}

  @Get('/author/:author')
  getBooksByAuthor(@Param() findByAuthor: FindByAuthorDto) : Promise<Book[]> {
    return this.bookService.getBooksByAuthor(findByAuthor);
  }

  @Get('/:title')
  getOneBook(@Param() findBookByTitle: FindBookByTitle) : Promise<Book> {
    return this.bookService.getOneBook(findBookByTitle);
  }

  @Post()
  addBook(@Body() createBookDto: CreateBookDto) : Promise<{success: boolean}> {
    return this.bookService.addBook(createBookDto);
  }

  @Patch('/:title')
  updateBook(@Param() findBookByTitle: FindBookByTitle, @Body() updateBookDto: UpdateBookDto) : Promise<Book> {
    return this.bookService.updateBook(findBookByTitle, updateBookDto);
  }

  @Delete('/:title')
  deleteBook(@Param() findBookByTitle: FindBookByTitle) : Promise<{success: boolean}> {
    return this.bookService.deleteBook(findBookByTitle);
  }
}
