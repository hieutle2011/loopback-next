// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {TypeOrmMixin} from '../../';

export class TypeOrmApp extends BootMixin(
  ServiceMixin(RepositoryMixin(TypeOrmMixin(RestApplication))),
) {
  constructor(options?: ApplicationConfig) {
    super(options);
    this.projectRoot = __dirname;
  }
}
