// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/typeorm
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Application, MixinTarget} from '@loopback/core';
import debugFactory from 'debug';
import {ConnectionOptions} from 'typeorm';
import {TypeOrmComponent} from '../';

const debug = debugFactory('loopback:typeorm:mixin');

export function TypeOrmMixin<T extends MixinTarget<Application>>(
  superClass: T,
) {
  return class extends superClass {
    typeormConnectionOptions: ConnectionOptions[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this.component(TypeOrmComponent);
    }

    async migrateSchema(): Promise<void> {
      // TODO: implement using TypeORM
    }
  };
}

export interface ApplicationUsingTypeOrm extends Application {
  typeormConnectionOptions: ConnectionOptions[];
  migrateSchema(): Promise<void>;
}
