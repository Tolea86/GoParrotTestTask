import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/author.mongo';
import { Book } from './book.mongo';
import { BookService } from './book.service';
import { FindByAuthorDto } from '../dto/FindByAuthorDto';
import { FindBookByTitle } from '../dto/FindBookByTitle';
import { CreateBookDto } from '../dto/CreateBookDto';
import { UpdateBookDto } from '../dto/UpdateBookDto';

describe('Book Controller', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        name: "default",
        type: "mongodb",
        host: "localhost",
        port: 27017,
        database: "goparrottask",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        entities: [
          Author,
          Book
        ],
      }), TypeOrmModule.forFeature([Book])],
      providers: [BookService],
      controllers: [BookController],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookController = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  describe('Implementation of CRUD functionality', () => {

    it('should return all books of the author', async () => {
      const book = new Book();
      book.title = "Book1";
      book.publishedAt = new Date().getTime();
      book.createdAt = new Date().getTime();
      book.author = "Test test";
      book.iban = "BE68539007547034";

      const findByAuthor = new FindByAuthorDto();
      findByAuthor.author = "Test test";

      jest.spyOn(bookService, 'getBooksByAuthor').mockImplementation(async () => [book]);

      expect(await bookController.getBooksByAuthor(findByAuthor)).toStrictEqual([book]);
    });

    it('should return one book', async () => {
      const book = new Book();
      book.title = "Book1";
      book.publishedAt = new Date().getTime();
      book.createdAt = new Date().getTime();
      book.author = "Test test";
      book.iban = "BE68539007547034";

      const findBookByTitle = new FindBookByTitle();
      findBookByTitle.title = "Book1";

      jest.spyOn(bookService, 'getOneBook').mockImplementation(async () => book);

      expect(await bookController.getOneBook(findBookByTitle)).toStrictEqual(book);
    });

    it('should add a new book', async () => {
      const createBookDto = new CreateBookDto();
      createBookDto.title = 'Book1';
      createBookDto.published_at = new Date().getTime();
      createBookDto.iban = 'BE68539007547034';
      createBookDto.author = 'Test test';

      const successObject = {success: true};

      jest.spyOn(bookService, 'addBook').mockImplementation(async () => successObject);

      expect(await bookController.addBook(createBookDto)).toStrictEqual(successObject);
    });

    it('should update a book', async () => {
      const findBookByTitle = new FindBookByTitle();
      findBookByTitle.title = "Book1";

      const updateBookDto = new UpdateBookDto();
      updateBookDto.title = 'Book1';
      updateBookDto.published_at = new Date().getTime();
      updateBookDto.iban = 'BE68539007547034';
      updateBookDto.author = 'Test test';

      const book = new Book();
      book.title = "Book1";
      book.publishedAt = new Date().getTime();
      book.createdAt = new Date().getTime();
      book.author = "Test test";
      book.iban = "BE68539007547034";

      jest.spyOn(bookService, 'updateBook').mockImplementation(async () => book);

      expect(await bookController.updateBook(findBookByTitle, updateBookDto)).toStrictEqual(book);
    });

    it('should delete a book', async () => {
      const findBookByTitle = new FindBookByTitle();
      findBookByTitle.title = "Book1";

      const successObject = {success: true};

      jest.spyOn(bookService, 'deleteBook').mockImplementation(async () => successObject);

      expect(await bookController.deleteBook(findBookByTitle)).toStrictEqual(successObject);
    });

  })
});
