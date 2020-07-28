import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/author.mongo';
import { Book } from './book.mongo';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
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
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
