# @loopback/typeorm

This module enables TypeORM support in LoopBack. For pending features, refer to
the "Pending" section.

## Overview

**NOTE**: This module is experimental and evolving.

## Installation

```sh
npm install --save @loopback/typeorm
```

## Basic Usage

### Enabling TypeORM support

To enable TypeORM support, import `TypeOrmMixin` from `@loopback/typeorm` and
apply it to your application class as shown below.

```ts
import {TypeOrmMixin} from '@loopback/typeorm';
...
export class AppaApplication extends BootMixin(
  ServiceMixin(TypeOrmMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    ...
  }
}

```

### Creating Entities

[Entities](https://typeorm.io/#/entities) are equivalent to Juggler's Models.
Define the entities as usual and keep them in a directory named `entities`, or
even `models` or any name, just make sure to load them correctly in the
connections.

```ts
// src/entities/book.entity.ts
import {Entity, Column, PrimaryColumn} from 'typeorm';
@Entity()
export class Photo {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isPublished: boolean;
}
```

### Creating Connections

[Connections](https://typeorm.io/#/connection) are equivalent to Juggler
datasources. They contain the connectivity and other details about the
databases. Define the connection in files with a `.connection.ts` extension and
keep them in the `connections` directory of the project.

```ts
// src/connections/sqlite.connection.ts
import path from 'path';
import {ConnectionOptions} from '@loopback/typeorm';
import {Book} from '../entities/';

export const SqliteConnection: ConnectionOptions = {
  name: 'SQLite',
  type: 'sqlite',
  database: path.join(__dirname, 'sqlite-test-db'),
  entities: [Book],
  synchronize: true,
};
```

Make sure to install the underlying database driver. For example, if you are
using SQlite, you'll need to install `sqlite3`.

```sh
npm install sqlite3
```

Refer to the
[TypeORM documentation](https://github.com/typeorm/typeorm#installation) for the
supported databases and the underlying drivers.

### Creating controllers

Controllers continue to work as usual. And you don't have to create repositories
since TypeORM creates them for you; just inject them in the controllers. The
repository API is 100% TypeORM
[repository API](https://typeorm.io/#/repository-api).

```ts
// src/controllers/book.controller.ts
import {get, post, Request, requestBody} from '@loopback/rest';
import {getModelSchema, Repository, typeorm} from '@loopback/typeorm';
import {Book} from '../entities';

export class BookController {
  @typeorm.repository(Book) private bookRepo: Repository<Book>;

  constructor() {}

  // Create a new book
  @post('/book')
  async create(@requestBody() data: Book) {
    const book = new Book();
    book.title = data.title;
    book.published = false;
    return await this.bookRepo.save(book);
  }

  // Find book by title
  @get('/note/{title}')
  async findByTitle(@param.path.string('title') title: string) {
    return await this.bookRepo.find({title});
  }
}
```

## Limitations

The current implementation does not support the following:

1. Database migration
2. Custom repository
3. Query filters
4. Complete TypeORM to OpenAPI data type conversion (currently only `number`,
   `string`, and `boolean` are supported)

## Contributions

- [Guidelines](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)
- [Join the team](https://github.com/strongloop/loopback-next/issues/110)

## Tests

Run `npm test` from the root folder.

## Contributors

See
[all contributors](https://github.com/strongloop/loopback-next/graphs/contributors).

## License

MIT
