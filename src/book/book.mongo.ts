import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  iban: string;

  @Column()
  publishedAt: number;

  @Column()
  createdAt: number;

  @Column({ default: 0})
  updatedAt: number;
}
