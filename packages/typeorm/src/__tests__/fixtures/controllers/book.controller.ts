// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {get, param, post, requestBody} from '@loopback/rest';
import {getModelSchema, Repository, typeorm} from '../../../';
import {Book} from '../entities/book.entity';

export class BookController {
  constructor() {}

  @typeorm.repository(Book, 'SQLite') private bookRepo: Repository<Book>;

  @post('/books', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchema(Book)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchema(Book, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    data: Omit<Book, 'id'>,
  ): Promise<Book> {
    const bookEntity = new Book();
    bookEntity.title = data.title;
    bookEntity.published = data.published;
    return await this.bookRepo.save(bookEntity);
  }

  @get('/books', {
    responses: {
      '200': {
        description: 'Array of Book entities',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchema(Book, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(): Promise<Book[]> {
    return await this.bookRepo.find();
  }

  @get('/books/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchema(Book, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
  ): Promise<Book | undefined> {
    return await this.bookRepo.findOne(id);
  }
}
