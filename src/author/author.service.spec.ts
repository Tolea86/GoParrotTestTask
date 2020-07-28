import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.mongo';
import { Book } from '../book/book.mongo';

describe('AuthorService', () => {
  let service: AuthorService;

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
      }), TypeOrmModule.forFeature([Author])],
      providers: [AuthorService],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
