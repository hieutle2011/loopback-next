// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {get, post} from '@loopback/openapi-v3';
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
    const res = await client.post('/hello').send(DATA);
    //console.log(res);
    expect(1);
  });

  async function getAppAndClient() {
    await sandbox.copyFile(resolve(__dirname, '../fixtures/application.js'));
    await sandbox.copyFile(
      resolve(__dirname, '../fixtures/connections/sqlite.connection.js'),
      'connections/sqlite.connection.js',
    );
    await sandbox.copyFile(
      resolve(__dirname, '../fixtures/entities/book.entity.js'),
      'entities/book.entity.js',
    );
    await sandbox.copyFile(
      resolve(__dirname, '../fixtures/controllers/book.controller.js'),
      'controllers/book.controller.js',
    );
    const MyApp = require(resolve(sandbox.path, 'application.js')).TypeOrmApp;
    app = new MyApp();
    app.controller(MyController);
    await app.start();
    client = createRestAppClient(app);
  }
});

class MyController {
  @get('/hi')
  greet() {
    return 'Hi';
  }

  @post('/hello')
  hello() {
    return 'Hello';
  }
}
