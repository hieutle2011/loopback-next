// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/typeorm
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Application, MixinTarget} from '@loopback/core';
import debugFactory from 'debug';
import {ConnectionManager, ConnectionOptions} from 'typeorm';
import {TypeOrmBindings} from '../keys';

const debug = debugFactory('loopback:typeorm:mixin');

export function TypeOrmMixin<T extends MixinTarget<Application>>(
  superClass: T,
) {
  return class extends superClass {
    connectionManager: ConnectionManager;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this.connectionManager = new ConnectionManager();
      const binding = this.bind(TypeOrmBindings.MANAGER).to(
        this.connectionManager,
      );
      debug('Binding created for connection manager', binding);
    }

    connection(connectionConfig: ConnectionOptions) {
      const connection = this.connectionManager.create(connectionConfig);
      const name = connection.name;
      const binding = this.bind(`connections.${name}`).toDynamicValue(() =>
        this.connectionManager.get(name),
      );
      debug('Binding created for connection %s: %j', name, binding);
    }

    async migrateSchema(): Promise<void> {
      // TODO: implement using TypeORM
    }
  };
}

export interface ApplicationUsingTypeOrm extends Application {
  typeormConnectionOptions: ConnectionOptions[];
  connection(options: ConnectionOptions): void;
  migrateSchema(): Promise<void>;
}
