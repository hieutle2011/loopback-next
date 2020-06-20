// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/typeorm
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  BindingScope,
  ContextTags,
  CoreBindings,
  inject,
  LifeCycleObserver,
  lifeCycleObserver,
} from '@loopback/core';
import {ConnectionManager} from 'typeorm';
import {ApplicationUsingTypeOrm, TypeOrmBindings} from '../';

@lifeCycleObserver('datasource', {
  tags: {[ContextTags.KEY]: TypeOrmBindings.CONNECTIONS},
  scope: BindingScope.SINGLETON,
})
export class TypeOrmConnections implements LifeCycleObserver {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private app: ApplicationUsingTypeOrm,
  ) {}

  readonly manager = new ConnectionManager();

  async start() {
    const connectionOptions = await this.app.typeormConnectionOptions;
    for (const option of connectionOptions) {
      const connection = this.manager.create(option);
      await connection.connect();
    }
  }

  async stop() {
    for (const connection of this.manager.connections) {
      await connection.close();
    }
  }
}
