import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.mongo';
import { Book } from '../book/book.mongo';
import { FindOneAuthorDto } from '../dto/FindOneAuthorDto';
import { CreateAuthorDto } from '../dto/CreateAuthorDto';
import { UpdateAuthorDto } from '../dto/UpdateAuthorDto';

describe('Author Controller', () => {
  let authorController: AuthorController;
  let authorService: AuthorService;

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
      }), TypeOrmModule.forFeature([Author])],
      controllers: [AuthorController],
      providers: [AuthorService]
    }).compile();

    authorController = module.get<AuthorController>(AuthorController);
    authorService = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(authorController).toBeDefined();
  });

  describe('Implementation of CRUD functionality', () => {
    it('should return all authors', async () => {
      const author = new Author();
      author.firstName = "Test";
      author.lastName = "Test";
      author.updatedAt = 0;
      author.createdAt = new Date().getTime();
      author.birthday = '10-10-2020';

      jest.spyOn(authorService, 'getAllAuthors').mockImplementation(async () => [author]);

      expect(await authorController.getAllAuthors()).toStrictEqual([author]);
    });

    it('should return one author', async () => {
      const author = new Author();
      author.firstName = "Test";
      author.lastName = "Test";
      author.updatedAt = 0;
      author.createdAt = new Date().getTime();
      author.birthday = '10-10-2020';

      const findOneAuthorDto = new FindOneAuthorDto();
      findOneAuthorDto.first_name = "Test";
      findOneAuthorDto.last_name = "Test";

      jest.spyOn(authorService, 'getOneAuthor').mockImplementation(async () => author);

      expect(await authorController.getOneAuthor(findOneAuthorDto)).toStrictEqual(author);
    });

    it('should add author', async () => {
      const createAuthorDto = new CreateAuthorDto();
      createAuthorDto.first_name = 'Test';
      createAuthorDto.last_name = 'Test';
      createAuthorDto.birthday = '10-10-2020';

      const successObject = {success: true};

      jest.spyOn(authorService, 'addAuthor').mockImplementation(async () => successObject);

      expect(await authorController.addAuthor(createAuthorDto)).toStrictEqual(successObject);
    });

    it('should delete author', async () => {
      const findOneAuthorDto = new FindOneAuthorDto();
      findOneAuthorDto.first_name = "Test";
      findOneAuthorDto.last_name = "Test";

      const successObject = {success: true};

      jest.spyOn(authorService, 'deleteAuthor').mockImplementation(async () => successObject);

      expect(await authorController.deleteAuthor(findOneAuthorDto)).toStrictEqual(successObject);
    });

    it('should update author', async () => {
      const findOneAuthorDto = new FindOneAuthorDto();
      findOneAuthorDto.first_name = "Test";
      findOneAuthorDto.last_name = "Test";

      const updateAuthorDto = new UpdateAuthorDto();
      updateAuthorDto.first_name = "Test";
      updateAuthorDto.last_name = "Test";
      updateAuthorDto.birthday = "10-10-2020";

      const author = new Author();
      author.firstName = "Test";
      author.lastName = "Test";
      author.updatedAt = 0;
      author.createdAt = new Date().getTime();
      author.birthday = '10-10-2020';

      jest.spyOn(authorService, 'updateAuthor').mockImplementation(async () => author);

      expect(await authorController.updateAuthor(findOneAuthorDto, updateAuthorDto)).toStrictEqual(author);

    })
  })
});
