import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author/author.mongo';
import { Book } from './book/book.mongo';

@Module({
  imports: [AuthorModule, BookModule,
    TypeOrmModule.forRoot({
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
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
