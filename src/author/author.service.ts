import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './author.mongo';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from '../dto/CreateAuthorDto';
import { FindOneAuthorDto } from '../dto/FindOneAuthorDto';
import { UpdateAuthorDto } from '../dto/UpdateAuthorDto';

@Injectable()
export class AuthorService {

  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) {}

  getAllAuthors() : Promise<Author[]> {
    return this.authorRepository.find();
  }

  getOneAuthor(findOneAuthorDto: FindOneAuthorDto) : Promise<Author> {
    return this.authorRepository.findOne({firstName: findOneAuthorDto.first_name, lastName: findOneAuthorDto.last_name});
  }

  async addAuthor(createAuthorDto: CreateAuthorDto) : Promise<{success: boolean}> {

    const author = await this.authorRepository.findOne({firstName: createAuthorDto.first_name, lastName: createAuthorDto.last_name});

    if(author != undefined) {
      throw new ConflictException('Author with selected First Name and Last name already exists');
    }

    const newAuthor = new Author();
    newAuthor.firstName = createAuthorDto.first_name;
    newAuthor.lastName = createAuthorDto.last_name;
    newAuthor.birthday = createAuthorDto.birthday;
    newAuthor.createdAt = new Date().getTime();

    this.authorRepository.save(newAuthor);

    return {success: true}
  }

  async updateAuthor(findOneAuthorDto: FindOneAuthorDto, updateAuthorDto: UpdateAuthorDto) : Promise<Author> {
    const author = await this.authorRepository.findOne({firstName: findOneAuthorDto.first_name, lastName: findOneAuthorDto.last_name});
    const checkAuthor = await this.authorRepository.findOne({firstName: updateAuthorDto.first_name, lastName: findOneAuthorDto.last_name});

    if(author == undefined) {
      throw new NotFoundException('Author not found');
    }

    if(checkAuthor != undefined && findOneAuthorDto.first_name != updateAuthorDto.first_name && findOneAuthorDto.last_name != updateAuthorDto.last_name) {
      throw new ConflictException('Author with selected First name and Last name already exists');
    }

    if(updateAuthorDto.first_name != undefined) {
      author.firstName = updateAuthorDto.first_name;
    }

    if(updateAuthorDto.last_name != undefined) {
      author.lastName = updateAuthorDto.last_name;
    }

    if(updateAuthorDto.birthday != undefined) {
      author.birthday = updateAuthorDto.birthday;
    }

    author.updatedAt = new Date().getTime();

    await this.authorRepository.update({ firstName: findOneAuthorDto.first_name, lastName: findOneAuthorDto.last_name }, author);

    return author;
  }

  async deleteAuthor(findOneAuthorDto: FindOneAuthorDto) : Promise<{success: boolean}>{

    const author = await this.authorRepository.findOne({ firstName: findOneAuthorDto.first_name, lastName: findOneAuthorDto.last_name });

    if(author == undefined) {
      throw new NotFoundException('Author not found');
    }

    await this.authorRepository.delete({firstName: findOneAuthorDto.first_name, lastName: findOneAuthorDto.last_name});

    return {success: true};
  }

}
