import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.mongo';
import { FindByAuthorDto } from '../dto/FindByAuthorDto';
import { FindBookByTitle } from '../dto/FindBookByTitle';
import { CreateBookDto } from '../dto/CreateBookDto';
import { UpdateBookDto } from '../dto/UpdateBookDto';

@Injectable()
export class BookService {

  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

  getBooksByAuthor(findByAuthor: FindByAuthorDto) : Promise<Book[]> {
    return this.bookRepository.find({author: findByAuthor.author});
  }

  getOneBook(findBookByTitle: FindBookByTitle) : Promise<Book> {
    return this.bookRepository.findOne( { title: findBookByTitle.title });
  }

  async addBook(createBookDto: CreateBookDto) : Promise<{success: boolean}> {

    const book = await this.bookRepository.findOne({ title: createBookDto.title });

    if(book != undefined) {
      throw new ConflictException('Book with the selected Title already exists');
    }

    const newBook = new Book();
    newBook.title = createBookDto.title;
    newBook.author = createBookDto.author;
    newBook.iban = createBookDto.iban;
    newBook.publishedAt = Number(createBookDto.published_at);
    newBook.createdAt = new Date().getTime();

    this.bookRepository.save(newBook);

    return {success: true};

  }

  async deleteBook(findBookByTitle: FindBookByTitle) : Promise<{success: boolean}> {

    const book = await this.bookRepository.findOne( { title: findBookByTitle.title });

    if(book == undefined) {
      throw new NotFoundException('Book not found');
    }

    await this.bookRepository.delete({ title: findBookByTitle.title });

    return {success: true};
  }

  async updateBook(findBookByTitle: FindBookByTitle, updateBookDto: UpdateBookDto) : Promise<Book> {

    const book = await this.bookRepository.findOne({title: findBookByTitle.title});
    const checkBook = await this.bookRepository.findOne({title: updateBookDto.title});

    if(book == undefined) {
      throw new NotFoundException('Book not found');
    }

    if(checkBook !== undefined && findBookByTitle.title != updateBookDto.title) {
      throw new ConflictException('Book with the selected Title already exists');
    }

    if(updateBookDto.title != undefined) {
      book.title = updateBookDto.title;
    }

    if(updateBookDto.author != undefined) {
      book.author = updateBookDto.author;
    }

    if(updateBookDto.iban != undefined){
      book.iban = updateBookDto.iban;
    }

    if(updateBookDto.published_at != undefined){
      book.publishedAt = updateBookDto.published_at;
    }

    book.updatedAt = new Date().getTime();

    await this.bookRepository.update({ title: findBookByTitle.title }, book);

    return book;
  }
}
