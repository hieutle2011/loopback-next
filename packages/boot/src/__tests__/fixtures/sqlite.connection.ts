// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ConnectionOptions} from '@loopback/typeorm';

export const SqliteConnection: ConnectionOptions = {
  name: 'SQLite',
  type: 'sqlite',
  database: 'test',
  entities: [],
  synchronize: true,
};
