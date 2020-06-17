// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/typeorm
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

// import {
//   Application,
//   Binding,
//   BindingAddress,
//   BindingScope,
//   Constructor,
//   ContextObserver,
//   CoreBindings,
//   createBindingFromClass,
//   filterByKey,
//   filterByTag,
//   inject,
//   Server,
//   Subscription,
// } from '@loopback/core';

import {
  bind,
  Binding,
  Component,
  ContextTags,
  CoreBindings,
  createBindingFromClass,
  inject,
} from '@loopback/core';
import {RestServerConfig} from '@loopback/rest';
import {TypeOrmBindings} from './keys';
import {TypeOrmConnectionManager} from './services';

const connectionsDir = 'connections/';

@bind({
  tags: {[ContextTags.KEY]: TypeOrmBindings.COMPONENT},
})
export class TypeOrmComponent implements Component {
  bindings: Binding[];

  constructor(
    @inject(CoreBindings.APPLICATION_CONFIG, {optional: true})
    config: RestServerConfig = {},
  ) {
    console.log(config);
    //const config = Binding.bind(TypeOrmBindings.COMPONENT).to(SQLLITE_CONNECTION);
    this.bindings = [createBindingFromClass(TypeOrmConnectionManager)];
  }
}

function migrateSchema() {}
