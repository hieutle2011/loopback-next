# @loopback/typeorm

This module enables TypeORM support in LoopBack.

## Overview

**NOTE**: This module is experimental and evolving.

## Installation

```sh
npm install --save @loopback/typeorm
```

## Basic use

### Enabling TypeORM support

Load the TypeORM package in the app.

```ts
```

### Defining Entities

Define the TypeORM entities as usual in files with the `.entity.ts` extension
and keep them in the `models` directory of the project.

```ts
// src/models/photo.entity.ts
import {Entity, Column, PrimaryColumn} from 'typeorm';
@Entity()
export class Photo {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;
}
```

### Defining a Connection

Connections are the equivalent of Juggler datasources. They contain the options
and connectivity details of the databases.

The repository module provides APIs to define LoopBack 3.x data sources and
models. For example,

```ts
// src/connections/sqlite.connection.ts
import path from 'path';
import {SqliteConnectionOptions} from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import {Book} from '../entities/';

export const SQLLITE_CONNECTION: SqliteConnectionOptions = {
  type: 'sqlite',
  database: path.join(__dirname, 'sqlite-test-db'),
  entities: [Book],
  synchronize: true,
};
```

### Defining a controller

Controllers serve as handlers for API requests. We declare controllers as
classes with optional dependency injection by decorating constructor parameters
or properties.

```ts
TODO: update this after implementation
// src/controllers/note.controller.ts
import {repository} from '@loopback/repository';
import {Note} from '../models';
import {post, requestBody, get, param} from '@loopback/rest';
import {inject} from '@loopback/core';

export class NoteController {
  constructor() {}

  @inject(RestBindings.Http.REQUEST) protected req: Request;
  @typeorm.repository(Book) private noteRepo: Repository<Book>;

  // Create a new note
  @post('/note')
  create(@requestBody() data: Note) {
    const note = new Note(note);
    return this.noteRepo.save(note);
  }

  // Find notes by title
  @get('/note/{title}')
  findByTitle(@param.path.string('title') title: string) {
    return this.noteRepo.find({title});
  }
}
```

- ORM should be implemented as extensions - Juggler, TypeORM, Sequelize etc.
- have to install typeorm and @loopback/typeorm
- config db
- need a CLI for generating TypeORM config artifacts
  - entities instead of models
  - connections instead of datasources
- don't need RepositoryMixin
  - but need migrateSchema
    - implement migrateSchema as a binding - update migrate.js
- param.path, requestBody - usable
- LB4 model-specific decorators
  - param.where, param.filter has to be developed from scratch
- need to write booters
- dont't need repositories as they are alreday provided by TypeORM
- users need to install corresponding packages else:
  - DriverPackageNotInstalledError: SQLite package has not been found installed.
    Try to install it: npm install sqlite3 --save

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
