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

    async migrateSchema(options: SchemaMigrationOptions = {}): Promise<void> {
      // TODO: implement using TypeORM
    }
  };
}

export interface ApplicationUsingTypeOrm extends Application {
  typeormConnectionOptions: ConnectionOptions[];
  migrateSchema(options?: SchemaMigrationOptions): Promise<void>;
}

export interface SchemaMigrationOptions extends Options {
  /**
   * When set to 'drop', schema migration will drop existing tables and recreate
   * them from scratch, removing any existing data along the way.
   *
   * When set to 'alter', schema migration will try to preserve current schema
   * and data, and perform a non-destructive incremental update.
   */
  existingSchema?: 'drop' | 'alter';

  /**
   * List of model names to migrate.
   *
   * By default, all models are migrated.
   */
  models?: string[];
}

/**
 * Type alias for Node.js options object
 */
export type Options = AnyObject;

/**
 * Objects with open properties
 */
export interface AnyObject {
  [property: string]: any;
}
