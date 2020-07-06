// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {RestApplication} from '@loopback/rest';
import {
  Client,
  createRestAppClient,
  expect,
  TestSandbox,
} from '@loopback/testlab';
import {resolve} from 'path';
import {TypeOrmApp} from '../fixtures/application';

describe.only('REST with TypeORM (integration)', () => {
  const sandbox = new TestSandbox(resolve(__dirname, '../../.sandbox'));

  let app: TypeOrmApp;
  let client: Client;

  beforeEach('reset sandbox', () => sandbox.reset());
  beforeEach(getAppAndClient);
  afterEach(async () => await app.close());

  it('creates an entity', async () => {
    const DATA = {
      title: 'The Jungle',
      published: true,
    };
    let res;
    res = await client.post('/books').send(DATA);
    console.log(res.text);
    console.log(res.body);
    expect(1);
  });

  async function getAppAndClient() {
    await sandbox.copyFile(resolve(__dirname, '../fixtures/application.js'));
    await sandbox.copyFile(
      resolve(__dirname, '../fixtures/sqlite.connection.js'),
      'connections/sqlite.connection.js',
    );
    await sandbox.copyFile(
      resolve(__dirname, '../fixtures/book.entity.js'),
      'entities/book.entity.js',
    );
    await sandbox.copyFile(
      resolve(__dirname, '../fixtures/book.controller.js'),
      'controllers/book.controller.js',
    );
    const MyApp = require(resolve(sandbox.path, 'application.js')).TypeOrmApp;
    app = new MyApp();
    await app.start();

    client = createRestAppClient(app as RestApplication);
  }
});
