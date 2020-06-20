// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {config, CoreBindings, inject} from '@loopback/core';
import {ApplicationUsingTypeOrm} from '@loopback/typeorm';
import debugFactory from 'debug';
import {BootBindings} from '../keys';
import {ArtifactOptions, booter} from '../types';
import {BaseArtifactBooter} from './base-artifact.booter';

const debug = debugFactory('loopback:boot:typeorm-connection-booter');

/**
 * A class that extends BaseArtifactBooter to boot the TypeORM connection artifact type.
 *
 * Supported phases: configure, discover, load
 *
 * @param app - Application instance
 * @param projectRoot - Root of user's project relative to which all paths are resolved
 * @param bootConfig - Connection artifact options object
 */
@booter('datasources')
export class TypeOrmConnectionBooter extends BaseArtifactBooter {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    public app: ApplicationUsingTypeOrm,
    @inject(BootBindings.PROJECT_ROOT) projectRoot: string,
    @config()
    public entityConfig: ArtifactOptions = {},
  ) {
    super(
      projectRoot,
      // Set TypeORM connection options if passed in via bootConfig
      Object.assign({}, ConnectionDefaults, entityConfig),
    );
  }

  async load() {
    for (const file of this.discovered) {
      const exported = require(file);
      const connectionKey = Object.keys(exported)[0];
      if (connectionKey) {
        const options = exported[connectionKey];
        this.app.typeormConnectionOptions.push(options);
      }
    }
  }
}

/**
 * Default ArtifactOptions for TypeORM connection.
 */
export const ConnectionDefaults: ArtifactOptions = {
  dirs: ['connections'],
  extensions: ['.connection.js'],
  nested: true,
};
